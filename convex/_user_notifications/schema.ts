import { message } from "antd";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user_notifications: defineTable({
        isRead: v.boolean(),
        message: v.string(),
        receiverId: v.string(),
        senderId: v.string(),
        senderName: v.string(),
        senderAvatarUrl: v.string(),
        description: v.string(),
        type: v.string(),
        topic: v.string(),
        href: v.string(),
    })
})