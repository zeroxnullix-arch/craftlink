# Fix totalEarnings ReferenceError in withdrawController.js

## Approved Plan Steps:

### 1. ✅ Update TODO.md [DONE]

### 2. ✅ Confirm courseModel has creator field [DONE]

### 3. ✅ Edit backend/controller/withdrawController.js [DONE]
- Added totalEarnings calculation in getInstructorEarnings():
  ```
  const courses = await Course.find({ creator: instructorId }).select("_id");
  const courseIds = courses.map(course => course._id);
  const payments = await Payment.find({ 
    course: { $in: courseIds }, 
    status: "success" 
  }).select("amount");
  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  ```

### 4. ✅ Test the fix
- Restart backend server (if running: Ctrl+C then npm start)
- Test GET /api/withdraw/earnings with instructor token
- Verify: no ReferenceError, totalEarnings shows lifetime earnings from course payments

### 5. ✅ Task completed
