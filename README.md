# GuestPic

GuestPic is an event planning and photo sharing app for iOS, developed in 8 days as the final project for the Northcoders Software Development Bootcamp.

Tech: TypeScript, React Native, Firebase.

The team was made up of [AdilBulsari](https://github.com/AdilBulsari), [Evil-Pablo](https://github.com/Evil-Pablo), [PDE24](https://github.com/PDE24) and [thatnick](https://github.com/thatnick).

## Building and running the app

Prerequisites: Xcode, watchman and cocoapods must be installed.

1. Clone the repo
2. Create a new project on Firebase with Auth, Firestore and Storage
3. Paste your Firebase config into firebase/firebaseAp.ts
4. Run `npm i`
5. Run `npx pod-install ios`
6. Run `npm run ios` (to run on the simulator) or open and build/run guestpic._xcworkspace_ (to run on your device).
