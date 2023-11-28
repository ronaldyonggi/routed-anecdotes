import { createContext, useContext, useReducer } from "react"

export const NotificationContext = createContext(null)
export const NotificationDispatchContext = createContext(null)

export function NotificationProvider({ children }) {
    const [notification, dispatch] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value={notification}>
            <NotificationDispatchContext.Provider value={dispatch}>
                {children}
            </NotificationDispatchContext.Provider>
        </NotificationContext.Provider>
    )

}

function notificationReducer(notification, action) {
    switch(action.type) {
        case 'set': {
            return action.payload
        }

        default: {
            throw Error('Unknown action: ' + action.type)
        }
    }
}

export function useNotification() {
    return useContext(NotificationContext)
}

export function useNotificationDispatch() {
    return useContext(NotificationDispatchContext)
}