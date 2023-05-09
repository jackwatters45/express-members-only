import { Schema, model, Types, Document } from "mongoose";

interface IMessage extends Document {
	user: Types.ObjectId;
	content: string;
	timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	content: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

export default model<IMessage>("Message", MessageSchema);
