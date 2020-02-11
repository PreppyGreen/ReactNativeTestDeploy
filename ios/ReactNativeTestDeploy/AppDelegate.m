/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
// #import <RNCPushNotificationIOS.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <AppCenterReactNativeAuth.h>

#import <UserNotifications/UserNotifications.h>

#import <RNAzureNotificationHub/RCTAzureNotificationHubManager.h>

@import AppCenterReactNativeShared;

@implementation AppDelegate


///start
// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
    [RCTAzureNotificationHubManager didRegisterUserNotificationSettings:notificationSettings];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [RCTAzureNotificationHubManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [RCTAzureNotificationHubManager didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
    [RCTAzureNotificationHubManager didReceiveRemoteNotification:notification];
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    [RCTAzureNotificationHubManager didReceiveLocalNotification:notification];
}
///end


//- (void)application:(UIApplication *)application
//    didReceiveRemoteNotification:(NSDictionary *)userInfo
//         fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
////	[RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//
//  NSDictionary *dictionary = [[userInfo objectForKey:@"aps"] objectForKey:@"alert"];
//  UIAlertController *alert = [UIAlertController alertControllerWithTitle:[dictionary valueForKey:@"title"]
//                                                                message:[dictionary valueForKey:@"body"]
//                                                        preferredStyle:UIAlertControllerStyleAlert];
//  UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK"
//                                              style:UIAlertActionStyleDefault
//                                            handler:^(UIAlertAction *action) {
//    [alert dismissViewControllerAnimated:YES completion:nil];
//  }];
//  [alert addAction:ok];
//  [self.window.rootViewController presentViewController:alert animated:YES completion:nil];
//}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ReactNativeTestDeploy"
                                            initialProperties:nil];
//  [AppCenterReactNativeAuth register];
//  [AppCenterReactNative register];
//  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
//  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
//  [AppCenterReactNativePush register];


//  if (@available(iOS 10.0, *)) {
//    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//    center.delegate = self;
//  }

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// iOS 10 and later, called	 when a notification is delivered to an app that is in the foreground.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
      willPresentNotification:(UNNotification *)notification
        withCompletionHandler:(void (^)(UNNotificationPresentationOptions options)) completionHandler API_AVAILABLE(ios(10.0)) {

    // Do something, e.g. set a BOOL @property to track the foreground state.
    self.didReceiveNotificationInForeground = YES;

    // Complete handling the notification.
    completionHandler(UNNotificationPresentationOptionNone);
}

//- (void)application:(UIApplication *)application
//    didReceiveRemoteNotification:(NSDictionary *)userInfo
//          fetchCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler {
//
//    // Do something differently if the push notification was received while in foreground.
//    if (self.didReceiveNotificationInForeground) {
//
//        // Handle the push notification that was received while in foreground.
//    } else {
//
//        // Handle the push notification that was received while app was in background.
//    }
//
//    // Reset the property for next notifications.
//    self.didReceiveNotificationInForeground = NO;
//}



// iOS 10 and later, asks the delegate to process the user's response to a delivered notification.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
            withCompletionHandler:(void (^)(void))completionHandler API_AVAILABLE(ios(10.0)) {

  // Perform the task associated with the action.
  if ([[response actionIdentifier] isEqualToString:UNNotificationDefaultActionIdentifier]) {

    // User tapped on notification
  }

  // Complete handling the notification.
  completionHandler();
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
