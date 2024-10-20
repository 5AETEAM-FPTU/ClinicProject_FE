import { mutation, query } from '../_generated/server'
import { v } from 'convex/values'

//to send user notification.
export const sendUserNotification = mutation({
    args: {
        message: v.string(),
        receiverId: v.string(),
        senderId: v.string(),
        senderName: v.string(),
        senderAvatarUrl: v.string(),
        description: v.string(),
        type: v.string(),
        topic: v.string(),
        href: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('user_notifications', {
            isRead: false,
            message: args.message,
            receiverId: args.receiverId,
            senderId: args.senderId,
            senderName: args.senderName,
            senderAvatarUrl: args.senderAvatarUrl,
            description: args.description,
            type: args.type,
            topic: args.topic,
            href: args.href,
        })
    },
})

export const getUserNofitication = query({
    args: {
        receiverId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('user_notifications')
            .filter((q) => q.eq(q.field('receiverId'), args.receiverId))
            .order('desc')
            .take(99)
        console.log('result: ', result)
        return result
    },
})

export const markNotificationAsRead = mutation({
    args: {
        id: v.id('user_notifications'),
    },
    handler: async (ctx, args) => {
        const { id } = args
        await ctx.db.patch(id, { isRead: true })
    },
})

export const deleteAllNotificationByReceiverId = mutation({
    args: {
        receiverId: v.string(),
    },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query('user_notifications')
            .filter((q) => q.eq(q.field('receiverId'), args.receiverId))
            .collect() 

        for (const notification of notifications) {
            await ctx.db.delete(notification._id) 
        }
    },
})
