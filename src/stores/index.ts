import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { baseApi } from './services/base'
import auth from './features/auth'
import loading from './features/loading'
import sidebar from './features/sidebar'
import { authApis } from './services/auth'
import { geminiApis } from './services/ai/gemini'
import { formServiceBaseApi as nodeServicerBaseApi } from './services/formServiceBase'
import chatControl from './features/chatControl'
export const createStore = (
    option?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
    configureStore({
        reducer: {
            [authApis.reducerPath]: authApis.reducer,
            [nodeServicerBaseApi.reducerPath]: nodeServicerBaseApi.reducer,
            auth,
            sidebar,
            loading,
            chatControl,
            [geminiApis.reducerPath]: geminiApis.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore these action paths and state paths
                    ignoredActions: ['form/executeMutation/fulfilled'],
                    ignoredPaths: [
                        'form.mutations.xye7Zo4Zuh39L3q1Eivs2.data',
                        'auth.storage.fileStorage',
                    ],
                },
            })
                .concat(baseApi.middleware)
                .concat(geminiApis.middleware)
                .concat(authApis.middleware)
                .concat(nodeServicerBaseApi.middleware),
    })
export const store = createStore()

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
