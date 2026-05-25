# 🚀 Quick Start Guide - TourismHub POS System

## ⚡ 5-Minute Setup

### 1. Start the Application
```bash
cd tourism-management-system
npm run dev
```

### 2. Open Browser
Navigate to: `http://localhost:5173`

### 3. You're Ready! 🎉

---

## 🎯 Quick Feature Tour

### Dashboard (Home)
- View real-time statistics
- Monitor visitor count
- Check revenue
- See recent transactions

**Try it**: Click different stat cards to see animations!

---

### POS Transaction (NEW! ⭐)

#### Step 1: Navigate to POS
1. Click **"POS"** in sidebar
2. Click **"New Transaction"** button (top right)

#### Step 2: Add Products
**Method 1: Browse**
- Scroll through product grid
- Click any product to add to cart

**Method 2: Search**
- Type product name in search bar
- Click to add

**Method 3: Filter**
- Click category buttons (All, Food, Beverage, etc.)
- Browse filtered products

#### Step 3: Manage Cart
- **Add More**: Click + button
- **Reduce**: Click - button
- **Remove**: Click trash icon
- **Clear All**: Click "Clear All" button

#### Step 4: Choose Payment

**Option A: QRIS (Recommended)**
1. Click purple "QRIS" button
2. Show QR code to customer
3. Wait for payment confirmation
4. Click "Complete Payment"

**Option B: Cash**
1. Click green "Cash" button
2. Enter amount received
3. System shows change automatically
4. Click "Complete Payment"

**Option C: Card**
1. Click blue "Card" button
2. Process with EDC machine
3. Click "Complete Payment"

#### Step 5: Complete
- ✅ Success message appears
- 📄 Option to print receipt
- 🔄 Start new transaction

---

## 💡 Pro Tips

### Keyboard Shortcuts (Coming Soon)
- `Ctrl + N`: New transaction
- `Ctrl + F`: Focus search
- `Esc`: Close modals

### Best Practices

**For Cashiers**:
1. Always verify cart before payment
2. Double-check cash amount
3. Print receipt for customer
4. Clear cart after each transaction

**For Managers**:
1. Monitor POS dashboard daily
2. Check top-selling products
3. Review payment method distribution
4. Track hourly sales patterns

---

## 🎨 Visual Guide

### Product Card
```
┌─────────────────┐
│      🍔         │  ← Emoji Icon
│   Combo Meal A  │  ← Product Name
│      Food       │  ← Category
│   Rp 150,000   │  ← Price
└─────────────────┘
```

### Cart Item
```
┌──────────────────────────────┐
│ Combo Meal A          [🗑️]  │
│ Rp 150,000                   │
│ [-] [2] [+]    Rp 300,000   │
└──────────────────────────────┘
```

### Payment Summary
```
Subtotal:    Rp 300,000
Tax (10%):   Rp  30,000
─────────────────────────
Total:       Rp 330,000
```

---

## 🔥 Common Scenarios

### Scenario 1: Quick Sale
**Customer wants 1 water**
1. Search "water"
2. Click product
3. Click QRIS
4. Complete payment
⏱️ Time: 30 seconds

### Scenario 2: Multiple Items
**Customer wants combo meal + drink + dessert**
1. Click "Combo Meal A"
2. Click "Soft Drink"
3. Click "Ice Cream"
4. Review cart (3 items)
5. Choose payment method
6. Complete
⏱️ Time: 1 minute

### Scenario 3: Cash Payment with Change
**Total: Rp 330,000, Customer pays: Rp 500,000**
1. Add items to cart
2. Click "Cash"
3. Enter "500000"
4. System shows: Change Rp 170,000
5. Complete payment
6. Give change to customer

### Scenario 4: Modify Order
**Customer changes mind**
1. Items in cart
2. Click - to reduce quantity
3. Click 🗑️ to remove item
4. Add new items
5. Proceed to payment

---

## 🎯 Feature Highlights

### ✨ What Makes It Special

**Smart Cart**
- Auto-calculates totals
- Real-time updates
- Quantity validation
- Empty state handling

**Flexible Payments**
- 3 payment methods
- Change calculation
- Payment validation
- Success confirmation

**Beautiful UI**
- Smooth animations
- Color-coded buttons
- Clear feedback
- Dark mode support

**User-Friendly**
- Intuitive layout
- Quick actions
- Search & filter
- Responsive design

---

## 📊 Sample Products

### Food (4 items)
- 🍔 Combo Meal A - Rp 150,000
- 🍕 Combo Meal B - Rp 175,000
- 🥪 Sandwich - Rp 75,000
- 🌭 Hot Dog - Rp 55,000

### Beverage (4 items)
- 💧 Bottled Water - Rp 20,000
- 🥤 Soft Drink - Rp 25,000
- ☕ Coffee - Rp 50,000
- 🧃 Juice - Rp 35,000

### Snack (2 items)
- 🍿 Snack Pack - Rp 50,000
- 🍟 French Fries - Rp 45,000

### Dessert (2 items)
- 🍦 Ice Cream - Rp 50,000
- 🍰 Cake Slice - Rp 60,000

---

## 🎓 Training Checklist

### For New Cashiers
- [ ] Navigate to POS Transaction
- [ ] Add 3 different products
- [ ] Adjust quantities
- [ ] Remove an item
- [ ] Clear cart
- [ ] Use search function
- [ ] Filter by category
- [ ] Process QRIS payment
- [ ] Process cash payment
- [ ] Process card payment
- [ ] Complete 5 practice transactions

### For Supervisors
- [ ] Review POS dashboard
- [ ] Check sales analytics
- [ ] Monitor payment methods
- [ ] Review top products
- [ ] Train new cashiers
- [ ] Handle refunds (coming soon)
- [ ] Generate reports (coming soon)

---

## 🐛 Troubleshooting

### Issue: Product not adding to cart
**Solution**: Click the product card directly, not the text

### Issue: Can't complete cash payment
**Solution**: Enter amount >= total. Check if change is positive.

### Issue: Modal won't close
**Solution**: Click X button or click outside modal

### Issue: Cart not updating
**Solution**: Refresh page (Ctrl+R)

### Issue: Dark mode looks weird
**Solution**: Toggle dark mode off and on again

---

## 🎯 Daily Operations

### Opening Shift
1. Login to system
2. Check POS dashboard
3. Verify product availability
4. Test payment methods
5. Ready for customers

### During Shift
1. Process transactions
2. Monitor cart carefully
3. Verify payments
4. Print receipts
5. Keep workspace clean

### Closing Shift
1. Complete all transactions
2. Count cash drawer
3. Generate shift report
4. Log out
5. Secure terminal

---

## 📱 Mobile Usage

### Responsive Design
- ✅ Works on tablets
- ✅ Touch-friendly buttons
- ✅ Optimized layout
- ✅ Swipe gestures

### Best Devices
- **Recommended**: iPad, Android Tablet
- **Minimum**: 10" screen
- **Optimal**: 12"+ screen

---

## 🔐 Security Tips

### For Cashiers
- Never share login credentials
- Lock screen when away
- Verify payment amounts
- Report suspicious transactions

### For Managers
- Regular password changes
- Monitor transaction logs
- Review daily reports
- Audit cash drawer

---

## 📞 Quick Help

### Need Help?
1. Check USER_GUIDE.md
2. Review FEATURES.md
3. Contact supervisor
4. Call IT support

### Report Issues
- Screenshot the problem
- Note what you were doing
- Report to manager
- Document in log

---

## 🎉 Success Metrics

### Good Performance
- ✅ < 2 min per transaction
- ✅ < 1% error rate
- ✅ 100% receipt printing
- ✅ Accurate cash handling

### Excellent Performance
- ⭐ < 1 min per transaction
- ⭐ 0% error rate
- ⭐ Customer satisfaction
- ⭐ Upselling success

---

## 🚀 Next Steps

### After Mastering Basics
1. Learn advanced features
2. Explore analytics
3. Generate reports
4. Train others
5. Suggest improvements

### Coming Soon
- Barcode scanner
- Loyalty program
- Discount codes
- Split payments
- Refund processing

---

## 💪 You're Ready!

**Congratulations!** You now know how to:
- ✅ Navigate the POS system
- ✅ Create transactions
- ✅ Process payments
- ✅ Handle common scenarios
- ✅ Troubleshoot issues

**Start practicing and you'll be a pro in no time!** 🎊

---

**Questions?** Check the full documentation or ask your supervisor!

**Happy Selling!** 🛍️
