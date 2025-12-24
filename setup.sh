#!/bin/bash

# Lumière Café - Production Setup Script
# This script prepares your application for deployment

set -e  # Exit on error

echo "🚀 Lumière Café - Production Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js v16 or higher from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v) detected${NC}"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env with your production settings!${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo -e "${GREEN}✅ Root dependencies installed${NC}"
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
echo -e "${GREEN}✅ Client dependencies installed${NC}"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd ../server
npm install
echo -e "${GREEN}✅ Server dependencies installed${NC}"
cd ..
echo ""

# Create uploads directory if it doesn't exist
if [ ! -d "server/uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p server/uploads
    echo -e "${GREEN}✅ Uploads directory created${NC}"
else
    echo -e "${GREEN}✅ Uploads directory exists${NC}"
fi

echo ""
echo "=================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Edit .env file with your settings:"
echo "   - Set MONGODB_URI (or leave empty for localStorage mode)"
echo "   - Update JWT secrets"
echo "   - Set CLIENT_URL"
echo ""
echo "2. For Development:"
echo "   npm run dev"
echo ""
echo "3. For Production Build:"
echo "   npm run build"
echo "   npm start"
echo ""
echo "4. With Docker:"
echo "   docker-compose up -d"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed deployment instructions"
echo ""
echo "🔐 Default Credentials:"
echo "   Admin: admin@admin.com / admin"
echo "   Demo:  demo@demo.com / demo"
echo ""
echo "🎉 Happy deploying!"
