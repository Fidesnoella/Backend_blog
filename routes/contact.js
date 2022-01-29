const express = require(`express`);
const contactController = require(`../controlers/contact`);
const router = express.Router();

router.post(`/contactInfo`, contactController.contactInfoController);
router.get(`/contactInfo`, contactController.getcontactInfos);
router.get(`/:_id`, contactController.getcontactInfo);
router.put(`/:_id`, contactController.updateContactInfo);
router.delete(`/:_id`, contactController.deleteContactInfo);



module.exports = router

