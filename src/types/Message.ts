type MessageT = {
  id: string;
  creationDate: Date;
  text: string;
  isEdited: boolean;
  creatorId: string;
  creatorNickname: string;
  roomId: string;
};

export default MessageT;
