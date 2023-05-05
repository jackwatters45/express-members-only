import { Schema, model, Types, Document } from "mongoose";

interface IMessage extends Document {
	user: Types.ObjectId;
	title: string;
	content: string;
	timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	title: { type: String, required: true },
	content: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

export default model<IMessage>("Message", MessageSchema);
