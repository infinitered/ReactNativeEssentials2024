# Notifications

## Libraries Used

- Local Notifications: [Notifee](https://notifee.app/)
- Push Notifications: [?]

## Implementation Details

### Local Notifications

There are a couple instances where the application displays local notifications.

#### Immediate Trigger

The first instance is when a user toggles the "Add to Favorites" switch on a game and there are no reviews. The application will immediately show the notification. The user can keep toggling on/off and a new notification will appear each time until a review is added.

Pressing on this notification should navigate to the game details screen followed by opening the review modal. To verify this: trigger the notification, press "back" to go to the list screen, press on the notification - app should display the review modal with the game details visible through the backdrop.

These are considered "foreground notifications" since the app is visible (uses the [foreground event](https://notifee.app/react-native/docs/events#foreground-events)).

#### Scheduled Trigger

The second instance for displaying a local notification is via [scheduling it](https://notifee.app/react-native/docs/triggers#timestamp-trigger) after the app is backgrounded. The prerequisite is the same - a game that is favorited without reviews. Upon backgrounding the app, a scheduled notification is delivered (5-10 seconds). This notification will include an "input" field ([android](https://notifee.app/react-native/docs/android/interaction#action-input), [ios](https://notifee.app/react-native/docs/ios/interaction#action-input)) for the user to directly leave a review for the specified game. Submitting a review should execute a [background process](https://notifee.app/react-native/docs/events#background-events) which will modify the MMKV store with the newly added review. Foregrounding the app should rehydrate the reviews from MMKV into the state context. Alternatively, clicking on the notification w/o submitting a review should open the game-details screen with the review modal.

Note: On Android 14, notifications with the "input" quick action do not emit events when in background. See: https://github.com/invertase/notifee/issues/1002

### Remote Push Notifications

todo...

### Additional Notes

For background events, UI cannot be updated since the callback is outside the react/navigation context. A `navigationQueue` is introduced and executed when the `navigate` method becomes available.
