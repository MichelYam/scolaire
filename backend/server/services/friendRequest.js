const FriendInvation = require('../models/FriendInvation')

module.exports.inviteUser = async (req, res) => {
    const emailRequested = req.body
    const { _id, email } = req.user
    try {
        if (email.toLowerCase() === emailRequested.toLowerCase()) {
            return res.send("Désolé, Vous ne pouvez pas devenir ami avec vous-même");
        }

        const targetUser = await User.findOne({
            email: emailRequested.toLowerCase(),
        });

        if (!targetUser) {
            return res.send(
                `${emailRequested} n'a pas été trouvé. Veuillez vérifier l'adresse e-mail. `
            );
        }

        //check if invitation has been already send

        const invitationAlreadyReceived = await FriendInvitation.findOne({
            senderId: userId,
            receiverId: targetUser._id,
        });

        if (invitationAlreadyReceived) {
            return res.send("Invitation has been already send!");
        }

        const userAlreadyFriends = targetUser.friends.find(
            (friendId) => friendId.toString() === _id.toString()
        );

        if (userAlreadyFriends) {
            return res.send("Friend already Added. Please Check Friends List");
        }

        const newInvitation = await FriendInvation.create({
            senderId: _id,
            receiverId: targetUser._id,
        });

        //send pending invitations update to specific user

        // friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

        return res.send("Invitation Has Been Sent!");
    } catch (error) {
        console.error('Error in FriendInvitationService.js', error)
        throw new Error(error)
    }
}

module.exports.acceptUser = async (req, res) => {
    try {
        const { id } = req.body;
        const invitation = await FriendInvation.findById({ _id: id });

        if (!invitation) {
            return res.send("Une erreur s'est produite. Veuillez réessayer");
        }

        const { senderId, receiverId } = invitation;

        // add friends to both users

        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        await senderUser.save();
        await receiverUser.save();

        // Delete Invitation

        await FriendInvation.findByIdAndDelete(id);

        //update list of the friends if users are online
        friendsUpdates.updateFriends(senderId.toString());
        friendsUpdates.updateFriends(receiverId.toString());

        //update lists of friends pending invitations
        friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(StatusCodes.OK).send("Ami ajouté avec succès !");
    } catch (error) {
        console.error('Error in FriendInvitationService.js', error)
        throw new Error(error)
        // return res.send("Une erreur s'est produite. Veuillez réessayer.");

    }
};

module.exports.rejectUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const currentUserId = req.user._id;

        const invitationExists = await FriendsInvitation.exists({ _id: _id });

        if (invitationExists) {
            await FriendsInvitation.findByIdAndDelete(_id);
        }

        friendsUpdates.updateFriendsPendingInvitations(currentUserId);

        return res.send("Invitation rejetée avec succès !");
    } catch (error) {
        console.error('Error in FriendInvitationService.js', error)
        throw new Error(error)
        // return res.send("Une erreur s'est produite. Veuillez réessayer.");
    }
};