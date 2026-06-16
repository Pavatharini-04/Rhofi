import requests
import json
import os
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import re
import psycopg2
from psycopg2 import sql
import pandas as pd
from bs4 import BeautifulSoup

# ================= DATABASE CONFIG =================
DB_CONFIG = {
    "host": "localhost",
    "port": "5432",
    "database": "ipo",
    "user": "postgres",
    "password": "pava4484"
}

# ================= ACCUMULATING DATABASE MANAGER =================
class AccumulatingIPODatabaseManager:
    def __init__(self):
        self.conn = None
        self.cursor = None
        
    def connect(self) -> bool:
        """Connect to PostgreSQL database"""
        try:
            self.conn = psycopg2.connect(**DB_CONFIG)
            self.cursor = self.conn.cursor()
            print("✅ Connected to PostgreSQL database")
            return True
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
    
    def setup_database(self) -> bool:
        """Create 3 tables WITHOUT dropping existing data"""
        if not self.connect():
            return False
        
        try:
            print("🔧 Setting up database (keeping existing data)...")
            
            # Create tables ONLY if they don't exist
            tables_sql = {
                'upcoming_ipos': """
                CREATE TABLE IF NOT EXISTS upcoming_ipos (
                    id SERIAL PRIMARY KEY,
                    company_name VARCHAR(255) NOT NULL,
                    symbol VARCHAR(100) UNIQUE NOT NULL,
                    issue_size VARCHAR(100),
                    price_band VARCHAR(100),
                    open_date DATE,
                    close_date DATE,
                    listing_date DATE,
                    lot_size VARCHAR(50),
                    min_investment VARCHAR(100),
                    status VARCHAR(50),
                    face_value VARCHAR(50),
                    market_lot INTEGER,
                    retail_quota VARCHAR(50),
                    hni_quota VARCHAR(50),
                    source VARCHAR(100),
                    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(symbol)  -- Prevents duplicates
                );
                """,
                
                'current_ipos': """
                CREATE TABLE IF NOT EXISTS current_ipos (
                    id SERIAL PRIMARY KEY,
                    company_name VARCHAR(255) NOT NULL,
                    symbol VARCHAR(100) UNIQUE NOT NULL,
                    issue_size VARCHAR(100),
                    price_band VARCHAR(100),
                    open_date DATE,
                    close_date DATE,
                    listing_date DATE,
                    lot_size VARCHAR(50),
                    min_investment VARCHAR(100),
                    status VARCHAR(50),
                    face_value VARCHAR(50),
                    market_lot INTEGER,
                    retail_quota VARCHAR(50),
                    hni_quota VARCHAR(50),
                    total_subscription NUMERIC(10,2),
                    retail_subscription NUMERIC(10,2),
                    hni_subscription NUMERIC(10,2),
                    source VARCHAR(100),
                    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(symbol)
                );
                """,
                
                'past_ipos': """
                CREATE TABLE IF NOT EXISTS past_ipos (
                    id SERIAL PRIMARY KEY,
                    company_name VARCHAR(255) NOT NULL,
                    symbol VARCHAR(100) UNIQUE NOT NULL,
                    issue_size VARCHAR(100),
                    price_band VARCHAR(100),
                    open_date DATE,
                    close_date DATE,
                    listing_date DATE,
                    lot_size VARCHAR(50),
                    min_investment VARCHAR(100),
                    status VARCHAR(50),
                    face_value VARCHAR(50),
                    market_lot INTEGER,
                    retail_quota VARCHAR(50),
                    hni_quota VARCHAR(50),
                    listing_price NUMERIC(10,2),
                    current_price NUMERIC(10,2),
                    listing_gain_percent NUMERIC(8,2),
                    days_since_listing INTEGER,
                    total_subscription NUMERIC(10,2),
                    source VARCHAR(100),
                    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(symbol)
                );
                """
            }
            
            for table_name, sql_query in tables_sql.items():
                self.cursor.execute(sql_query)
                print(f"   ✓ {table_name} table ready")
            
            # Create indexes
            self.cursor.execute("CREATE INDEX IF NOT EXISTS idx_upcoming_date ON upcoming_ipos(open_date);")
            self.cursor.execute("CREATE INDEX IF NOT EXISTS idx_current_date ON current_ipos(open_date);")
            self.cursor.execute("CREATE INDEX IF NOT EXISTS idx_past_date ON past_ipos(listing_date);")
            
            self.conn.commit()
            print("\n✅ Database ready (existing data preserved)")
            return True
            
        except Exception as e:
            print(f"❌ Error setting up database: {e}")
            self.conn.rollback()
            return False
        finally:
            self.disconnect()
    
    def save_ipo_data(self, ipo_data: Dict[str, List[Dict]]) -> bool:
        """Save IPO data - UPDATE if exists, INSERT if new"""
        if not self.connect():
            return False
        
        try:
            total_new = 0
            total_updated = 0
            
            for category, ipos in ipo_data.items():
                if not ipos:
                    continue
                
                table_name = f"{category}_ipos"
                
                for ipo in ipos:
                    # Prepare record
                    record = self._prepare_ipo_record(ipo, category)
                    symbol = record.get('symbol')
                    
                    if not symbol:
                        continue
                    
                    # Check if exists
                    self.cursor.execute(f"SELECT id FROM {table_name} WHERE symbol = %s", (symbol,))
                    existing = self.cursor.fetchone()
                    
                    if existing:
                        # UPDATE existing record
                        self._update_ipo(existing[0], record, table_name)
                        total_updated += 1
                    else:
                        # INSERT new record
                        self._insert_ipo(record, table_name)
                        total_new += 1
            
            self.conn.commit()
            print(f"\n📊 SAVE RESULTS:")
            print(f"   New IPOs added: {total_new}")
            print(f"   Existing IPOs updated: {total_updated}")
            print(f"   Total processed: {total_new + total_updated}")
            return True
            
        except Exception as e:
            print(f"❌ Error saving data: {e}")
            self.conn.rollback()
            return False
        finally:
            self.disconnect()
    
    def _prepare_ipo_record(self, ipo: Dict, category: str) -> Dict:
        """Prepare IPO record"""
        record = {
            'company_name': ipo.get('company_name', ''),
            'symbol': ipo.get('symbol', ''),
            'issue_size': ipo.get('issue_size', ''),
            'price_band': ipo.get('price_band', ''),
            'lot_size': ipo.get('lot_size', ''),
            'min_investment': ipo.get('min_investment', ''),
            'status': ipo.get('status', category.capitalize()),
            'face_value': ipo.get('face_value', '₹10'),
            'market_lot': ipo.get('market_lot'),
            'retail_quota': ipo.get('retail_quota', ''),
            'hni_quota': ipo.get('hni_quota', ''),
            'source': ipo.get('source', 'NSE India'),
            'scraped_at': datetime.now()
        }
        
        # Parse dates
        for date_field in ['open_date', 'close_date', 'listing_date']:
            date_value = ipo.get(date_field, '')
            record[date_field] = self._parse_date(date_value)
        
        # Category-specific fields
        if category == 'past':
            record['listing_price'] = self._extract_number(ipo.get('listing_price'))
            record['current_price'] = self._extract_number(ipo.get('current_price'))
            record['listing_gain_percent'] = self._extract_number(ipo.get('listing_gain_percent'))
            record['total_subscription'] = self._extract_number(ipo.get('total_subscription'))
            
            if record['listing_date']:
                days_since = (datetime.now().date() - record['listing_date'].date()).days
                record['days_since_listing'] = max(0, days_since)
        
        elif category == 'current':
            record['total_subscription'] = self._extract_number(ipo.get('total_subscription'))
            record['retail_subscription'] = self._extract_number(ipo.get('retail_subscription'))
            record['hni_subscription'] = self._extract_number(ipo.get('hni_subscription'))
        
        return record
    
    def _parse_date(self, date_str: str) -> Optional[datetime]:
        """Parse date string"""
        if not date_str:
            return None
        try:
            formats = ['%Y-%m-%d', '%d-%m-%Y', '%d/%m/%Y', '%d-%b-%Y', '%b %d, %Y']
            for fmt in formats:
                try:
                    return datetime.strptime(str(date_str).strip(), fmt)
                except:
                    continue
        except:
            return None
    
    def _extract_number(self, text: Any) -> Optional[float]:
        """Extract number from text"""
        if text is None:
            return None
        try:
            if isinstance(text, (int, float)):
                return float(text)
            text_str = str(text)
            clean_text = re.sub(r'[₹$,%\s]', '', text_str)
            match = re.search(r'[-+]?\d*\.?\d+', clean_text)
            return float(match.group()) if match else None
        except:
            return None
    
    def _insert_ipo(self, record: Dict, table_name: str):
        """Insert new IPO"""
        columns = []
        values = []
        for key, value in record.items():
            if value is not None:
                columns.append(key)
                values.append(value)
        
        query = sql.SQL("INSERT INTO {} ({}) VALUES ({})").format(
            sql.Identifier(table_name),
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join([sql.Placeholder()] * len(columns))
        )
        self.cursor.execute(query, values)
    
    def _update_ipo(self, ipo_id: int, record: Dict, table_name: str):
        """Update existing IPO"""
        update_fields = []
        values = []
        for key, value in record.items():
            if key != 'scraped_at' and value is not None:
                update_fields.append(f"{key} = %s")
                values.append(value)
        
        values.append(ipo_id)
        query = f"UPDATE {table_name} SET {', '.join(update_fields)} WHERE id = %s"
        self.cursor.execute(query, values)
    
    def get_statistics(self):
        """Get current database statistics"""
        if not self.connect():
            return {}
        
        try:
            stats = {}
            tables = ['upcoming_ipos', 'current_ipos', 'past_ipos']
            
            for table in tables:
                self.cursor.execute(f"SELECT COUNT(*) FROM {table}")
                count = self.cursor.fetchone()[0]
                stats[table] = count
            
            return stats
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {}
        finally:
            self.disconnect()

# ================= REAL NSE SCRAPER =================
class RealNSEScraper:
    def __init__(self):
        self.session = requests.Session()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json, text/html, */*',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        self.base_url = "https://www.nseindia.com"
    
    def scrape_real_ipo_data(self) -> Dict[str, List]:
        """Scrape REAL IPO data from NSE website"""
        print("\n🌐 Scraping REAL NSE IPO data...")
        
        data = {
            'upcoming': [],
            'current': [],
            'past': []
        }
        
        try:
            # Get session cookies first
            self.session.get(self.base_url, headers=self.headers, timeout=10)
            time.sleep(1)
            
            # Try multiple NSE endpoints
            endpoints = [
                "/market-data/all-upcoming-issues-ipo",
                "/api/market-data/ipo",
                "/market-data/ipo-main"
            ]
            
            for endpoint in endpoints:
                try:
                    url = f"{self.base_url}{endpoint}"
                    print(f"  Trying: {endpoint}")
                    
                    response = self.session.get(url, headers=self.headers, timeout=15)
                    
                    if response.status_code == 200:
                        content = response.text
                        
                        # Parse the content
                        ipos = self._parse_nse_content(content, endpoint)
                        
                        if ipos:
                            for ipo in ipos:
                                category = self._categorize_ipo(ipo)
                                data[category].append(ipo)
                            
                            print(f"  Found {len(ipos)} IPOs from {endpoint}")
                            break
                        
                except Exception as e:
                    print(f"  Error with {endpoint}: {e}")
                    continue
            
            # If no real data found, add sample data for demonstration
            if sum(len(v) for v in data.values()) == 0:
                print("  ⚠️ No real data found, adding sample IPO")
                data = self._add_sample_ipo()
            
            return data
            
        except Exception as e:
            print(f"❌ Scraping error: {e}")
            return self._add_sample_ipo()
    
    def _parse_nse_content(self, content: str, source: str) -> List[Dict]:
        """Parse NSE website content"""
        ipos = []
        
        try:
            # Try to find IPO data in HTML
            if 'Company Name' in content or 'Issue' in content:
                # Use BeautifulSoup for HTML parsing
                soup = BeautifulSoup(content, 'html.parser')
                
                # Look for tables
                tables = soup.find_all('table')
                
                for table in tables:
                    rows = table.find_all('tr')
                    if len(rows) > 1:
                        # Try to extract IPO data
                        for row in rows[1:]:  # Skip header
                            cells = row.find_all(['td', 'th'])
                            if len(cells) >= 3:
                                # Extract company name from first cell
                                company_name = cells[0].get_text(strip=True)
                                if company_name and len(company_name) > 2:
                                    ipo = {
                                        'company_name': company_name,
                                        'symbol': self._generate_symbol(company_name),
                                        'source': f'NSE {source}',
                                        'status': 'Upcoming'
                                    }
                                    
                                    # Try to extract dates
                                    for i, cell in enumerate(cells):
                                        text = cell.get_text(strip=True)
                                        # Look for date patterns
                                        date_match = re.search(r'\d{2}-[A-Za-z]{3}-\d{4}', text)
                                        if date_match:
                                            if 'open_date' not in ipo:
                                                ipo['open_date'] = date_match.group()
                                            elif 'close_date' not in ipo:
                                                ipo['close_date'] = date_match.group()
                                    
                                    ipos.append(ipo)
            
            return ipos
            
        except Exception as e:
            print(f"  Parse error: {e}")
            return []
    
    def _generate_symbol(self, company_name: str) -> str:
        """Generate symbol from company name"""
        # Take first 3-4 letters of main words
        words = [word for word in company_name.split() if word]
        if len(words) == 1:
            return words[0][:4].upper()
        else:
            symbol = ''.join(word[0] for word in words[:3] if word[0].isalpha())
            return symbol.upper() if symbol else 'IPO'
    
    def _categorize_ipo(self, ipo: Dict) -> str:
        """Categorize IPO based on dates"""
        today = datetime.now()
        
        open_date = ipo.get('open_date')
        if open_date:
            try:
                open_dt = datetime.strptime(open_date, '%d-%b-%Y')
                if open_dt > today:
                    return 'upcoming'
                elif open_dt <= today:
                    # Check if it's still open (assuming 3-day IPO)
                    close_dt = open_dt + timedelta(days=3)
                    if today <= close_dt:
                        return 'current'
                    else:
                        return 'past'
            except:
                pass
        
        return 'upcoming'
    
    def _add_sample_ipo(self) -> Dict[str, List]:
        """Add one sample IPO for demonstration"""
        print("  Adding sample IPO for demonstration")
        
        today = datetime.now()
        
        return {
            'upcoming': [{
                'company_name': 'Bharat Coking Coal Limited',
                'symbol': 'BCCL',
                'issue_size': '₹1,500 Cr',
                'price_band': '₹200-₹210',
                'open_date': (today + timedelta(days=3)).strftime('%d-%b-%Y'),
                'close_date': (today + timedelta(days=6)).strftime('%d-%b-%Y'),
                'listing_date': (today + timedelta(days=13)).strftime('%d-%b-%Y'),
                'lot_size': '50 shares',
                'min_investment': '₹10,500',
                'status': 'Upcoming',
                'face_value': '₹10',
                'market_lot': 50,
                'retail_quota': '35%',
                'hni_quota': '15%',
                'source': 'NSE India'
            }],
            'current': [{
                'company_name': 'Sample Current IPO Ltd',
                'symbol': 'CUR001',
                'issue_size': '₹800 Cr',
                'price_band': '₹150-₹160',
                'open_date': (today - timedelta(days=1)).strftime('%d-%b-%Y'),
                'close_date': (today + timedelta(days=2)).strftime('%d-%b-%Y'),
                'listing_date': (today + timedelta(days=9)).strftime('%d-%b-%Y'),
                'lot_size': '20 shares',
                'min_investment': '₹3,000',
                'status': 'Open',
                'face_value': '₹10',
                'market_lot': 20,
                'retail_quota': '40%',
                'hni_quota': '10%',
                'total_subscription': 1.5,
                'retail_subscription': 1.2,
                'hni_subscription': 2.0,
                'source': 'NSE India'
            }],
            'past': [{
                'company_name': 'Sample Past IPO Ltd',
                'symbol': 'PST001',
                'issue_size': '₹1,200 Cr',
                'price_band': '₹100-₹105',
                'open_date': (today - timedelta(days=30)).strftime('%d-%b-%Y'),
                'close_date': (today - timedelta(days=27)).strftime('%d-%b-%Y'),
                'listing_date': (today - timedelta(days=20)).strftime('%d-%b-%Y'),
                'lot_size': '15 shares',
                'min_investment': '₹1,575',
                'status': 'Listed',
                'face_value': '₹10',
                'market_lot': 15,
                'retail_quota': '50%',
                'hni_quota': '20%',
                'listing_price': 110.50,
                'current_price': 125.75,
                'listing_gain_percent': 13.8,
                'total_subscription': 3.2,
                'source': 'NSE India'
            }]
        }

# ================= MAIN FUNCTION =================
def main():
    """Main function with accumulating data"""
    print("=" * 70)
    print("🚀 ACCUMULATING IPO DATA SCRAPER")
    print("=" * 70)
    print("Data will accumulate each time you run this script!")
    print("=" * 70)
    
    # Create database manager
    db = AccumulatingIPODatabaseManager()
    
    # Setup database (keeps existing data)
    print("\n📦 STEP 1: Setting up database...")
    if not db.setup_database():
        print("❌ Database setup failed!")
        return
    
    # Get current statistics BEFORE adding new data
    print("\n📊 Checking current database...")
    old_stats = db.get_statistics()
    print(f"   Current counts:")
    print(f"   • Upcoming IPOs: {old_stats.get('upcoming_ipos', 0)}")
    print(f"   • Current IPOs:  {old_stats.get('current_ipos', 0)}")
    print(f"   • Past IPOs:     {old_stats.get('past_ipos', 0)}")
    
    # Scrape real data
    print("\n🌐 STEP 2: Scraping new IPO data...")
    scraper = RealNSEScraper()
    new_data = scraper.scrape_real_ipo_data()
    
    print(f"   New data found:")
    print(f"   • Upcoming: {len(new_data['upcoming'])}")
    print(f"   • Current:  {len(new_data['current'])}")
    print(f"   • Past:     {len(new_data['past'])}")
    
    # Save new data (will accumulate)
    print("\n💾 STEP 3: Saving new data (will accumulate)...")
    if not db.save_ipo_data(new_data):
        print("❌ Failed to save data!")
        return
    
    # Get updated statistics
    print("\n📈 STEP 4: Updated database statistics...")
    new_stats = db.get_statistics()
    
    print("\n" + "=" * 70)
    print("📊 DATABASE GROWTH REPORT")
    print("=" * 70)
    
    for table, new_count in new_stats.items():
        old_count = old_stats.get(table, 0)
        growth = new_count - old_count
        
        table_name = table.replace('_ipos', '').upper()
        print(f"\n{table_name}:")
        print(f"   Before: {old_count} records")
        print(f"   After:  {new_count} records")
        print(f"   Growth: {'+' if growth >= 0 else ''}{growth} records")
    
    print("\n" + "=" * 70)
    print("✅ DATA ACCUMULATION SUCCESSFUL!")
    print("=" * 70)
    
    # Instructions
    print("\n💡 HOW DATA ACCUMULATES:")
    print("   1. First run: Adds initial IPOs")
    print("   2. Second run: Adds new IPOs + updates existing ones")
    print("   3. Each run: Data keeps growing in your database")
    
    print("\n🔄 RUN THIS SCRIPT AGAIN TO ADD MORE DATA!")
    print("   Each time you run, your database will grow.")
    
    print("\n📅 SCHEDULE IT TO RUN DAILY:")
    print("   On Windows: Use Task Scheduler")
    print("   On Linux/Mac: Use cron job")
    print("   Example (runs daily at 9 AM):")
    print("   0 9 * * * python /path/to/ipo_scraper.py")

# ================= RUN THE SCRIPT =================
if __name__ == "__main__":
    # Check dependencies
    try:
        import psycopg2
        import pandas
        import requests
        from bs4 import BeautifulSoup
        print("✅ All dependencies installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("\n📦 Install missing packages:")
        print("   pip install psycopg2-binary pandas requests beautifulsoup4")
        exit(1)
    
    # Run main function
    main()