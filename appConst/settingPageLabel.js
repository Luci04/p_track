import { ShareInfo, onCreateTriggerNotification } from "../utility/helperFunction";


export default [
  {
    "title": "My Cycle",
    "iconName": "water-drop",
    "iconCommunity": "MaterialIcons",
    "children": [
      {
        "title": "Period prediction",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "PredictionScreen"
      },
      // {
      //   "title": "Ovulation and fertility prediction"
      // },
      // {
      //   "title": "Pregnancy"
      // }
    ]
  },
  {
    "title": "Reminders",
    "iconName": "bell",
    "iconCommunity": "Entypo",
    "children": [
      {
        "title": "Cycle reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Cycle Remainder"
      },
      {
        "title": "Medicine reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Medicine Remainder"
      },
      {
        "title": "Contraception reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Contraception Remainder"
      },
      {
        "title": "Meditation remainder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Meditation Remainder"
      },
      {
        "title": "Daily logging remainder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Daily Logging Remainder"
      },
      {
        "title": "Tracking remainder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Tracking Remainder"
      },
      // {
      //   "title": "Secret reminders"
      // }
    ]
  },
  {
    "title": "Personal",
    "iconName": "face-woman-shimmer-outline",
    "iconCommunity": "MaterialCommunityIcons",
    "children": [
      {
        "title": "Your Name",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Your Name Screen"
      },
      {
        "title": "Secure access (PIN)",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Secure Accesss"
      },
      {
        "title": "Calender view"
      },
      {
        "title": "Regional setting"
      },
      {
        "title": "Stats updates"
      },
      {
        "title": "Language"
      }
    ]
  },
  {
    "title": "My Data",
    "iconName": "database",
    "iconCommunity": "Octicons",
    "children": [
      {
        "title": "Back up data"
      },
      {
        "title": "Restore data"
      },
      {
        "title": "Delete app data"
      }
    ]
  },
  {
    "title": "Other",
    "iconName": "setting",
    "iconCommunity": "AntDesign",
    "children": [
      {
        "title": "Upgrade to Premium"
      },
      {
        "title": "Remove ads"
      },
      {
        "title": "Share with friends",
        onClick: ShareInfo
      },
      {
        "title": "Security",
        onClick: onCreateTriggerNotification
      },
      {
        "title": "Privacy"
      },
      {
        "title": "Rate app"
      }
    ]
  }
]
