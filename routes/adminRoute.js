import { admin, protect } from '../middleware/auth.js';
import express from 'express';
import adminGetUsers from '../controllers/admin/adminGetUsers.js';
import { sort } from '../middleware/sort.js';
import adminRefillRequests from '../controllers/admin/adminRefillRequests.js';
import adminWithdrawRequests from '../controllers/admin/adminWithdrawRequest.js';
import adminPaidBooks from '../controllers/admin/adminPaidBooks.js';
import adminUnlocks from '../controllers/admin/adminUnlocks.js';
import earnedFromBook from '../controllers/booksController/earnedFromBook.js';
import earnedFromChapter from '../controllers/booksController/earnedFromChapter.js';
import adminGetReports from '../controllers/admin/adminGetReports.js';
import adminBooks from '../controllers/admin/adminBooks.js';
import adminBook from '../controllers/admin/items/adminBook.js';
import adminChapter from '../controllers/admin/items/adminChapter.js';
import adminRefill from '../controllers/admin/items/adminRefill.js';
import adminWithdraw from '../controllers/admin/items/adminWithdraw.js';
import adminUser from '../controllers/admin/items/adminUser.js';
import adminPurchase from '../controllers/admin/items/adminPurchase.js';
import adminReport from '../controllers/admin/items/adminReport.js';
import adminBanBook from '../controllers/admin/updates/adminBanBook.js';
import adminBanChapter from '../controllers/admin/updates/adminBanChapter.js';
import adminBanUser from '../controllers/admin/updates/adminBanUser.js';
import adminChangeUserRole from '../controllers/admin/updates/adminChangeUserRole.js';
import adminChangeWithdrawStatus from '../controllers/admin/updates/adminChangeWithdrawStatus.js';
import adminChangeRefillStatus from '../controllers/admin/updates/adminChangeRefillStatus.js';
import adminChangeReportStatus from '../controllers/admin/updates/adminChangeReportStatus.js';
import adminBanComment from '../controllers/admin/updates/adminBanComment.js';
import adminInfo from '../controllers/admin/adminInfo.js';
import adminUpdateInfo from '../controllers/admin/updates/adminUpdateInfo.js';

const router = express.Router();

// router.get('/', getAllBooks);
// router.post('/', protect, addNewBook);
// router.get('/:id', protect, getBookById);
// router.put('/publish', protect, publishBook);
// router.put('/', protect, editBook);

router.get('/reports', protect, admin, sort, adminGetReports);
router.get('/users', protect, admin, sort, adminGetUsers);
router.get('/refills', protect, admin, sort, adminRefillRequests);
router.get('/withdraws', protect, admin, sort, adminWithdrawRequests);
router.get('/paidbooks', protect, admin, sort, adminPaidBooks);
router.get('/books', protect, admin, sort, adminBooks);
router.get('/unlocks', protect, admin, sort, adminUnlocks);
router.get('/basic', adminInfo);

router.get('/bookearned/:id', protect, admin, earnedFromBook);
router.get('/chapterearned/:id', protect, admin, earnedFromChapter);

router.get('/book/:id', protect, admin, adminBook);
router.get('/chapter/:id', protect, admin, adminChapter);
router.get('/refill/:id', protect, admin, adminRefill);
router.get('/withdraw/:id', protect, admin, adminWithdraw);
router.get('/user/:id', protect, admin, adminUser);
router.get('/unlock/:id', protect, admin, adminPurchase);
router.get('/report/:id', protect, admin, adminReport);

router.put('/banbook/:id', protect, admin, adminBanBook);
router.put('/banchapter/:id', protect, admin, adminBanChapter);
router.put('/banuser/:id', protect, admin, adminBanUser);
router.put('/bancomment/:id', protect, admin, adminBanComment);

router.put('/userrole/:id', protect, admin, adminChangeUserRole);
router.put('/withdraw/:id', protect, admin, adminChangeWithdrawStatus);
router.put('/refill/:id', protect, admin, adminChangeRefillStatus);
router.put('/report/:id', protect, admin, adminChangeReportStatus);

router.put('/updateinfo', protect, admin, adminUpdateInfo);

export default router;
