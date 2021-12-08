const router = require("express").Router();
const {
  models: { User, Channel, Message },
} = require("../../db");
const { requireToken } = require("../gatekeeping");

module.exports = router;

// GET /api/messages

router.get("/channels/participant", requireToken, async (req, res, next) => {
  try {
    const channelIdens = await Message.findAll({
      where: {
        userId: req.user.id
      }
    })
    const mapped = channelIdens.map(message => (message.channelId))
    const myChannels = await Promise.all(mapped.map(id => {
      return Channel.findByPk(id)
    }))
    res.send(myChannels)
    } catch (err) {
      next(err)
    }

})

// all messages...
router.get("/", async (req, res, next) => {
  try {
    // fix later
    // const users = await User.findAll()
    const messages = await Message.findAll({ include: User });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// GET /api/routes/messages/:channelId
// messages by channel id
router.get("/:channelId/", async (req, res, next) => {
  try {
    const channelId = req.params.channelId;
    const messages = await Message.findAll({
      where: { channelId },
      include: User,
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
// Creating a message based off of req.body
router.post("/", requireToken, async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const message = await Message.create(req.body);
    await message.setUser(req.user);
    const newMessage = await Message.findOne({
      order: [["id", "DESC"]],
      include: User,
    });
    res.json(newMessage);
  } catch (err) {
    next(err);
  }
});

// PUT /api/messages/:messageId

// DELETE /api/routes/channels
// create frontend " ARE YOU SURE YOU WANT TO DELETE ?"
router.delete("/:messageId", async (req, res, next) => {
  try {
    const id = req.params.messageId;
    await Message.destroy({ where: { id } });
    res.send("Message Deleted").status(204).end();
  } catch (err) {
    next(err);
  }
});
