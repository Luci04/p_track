import { ShareInfo, onCreateTriggerNotification } from "../utility/helperFunction";


export default [
  {
    "title": "my_cycle",
    "iconName": "water-drop",
    "iconCommunity": "MaterialIcons",
    "children": [
      {
        "title": "period_prediction",
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
    "title": "reminders",
    "iconName": "bell",
    "iconCommunity": "Entypo",
    "children": [
      {
        "title": "cycle_reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Cycle Remainder"
      },
      {
        "title": "medicine_reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Medicine Remainder"
      },
      {
        "title": "contraception_reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Contraception Remainder"
      },
      {
        "title": "meditation_remainder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Meditation Remainder"
      },
      {
        "title": "daily_logging_remainder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Daily Logging Remainder"
      },
      {
        "title": "tracking_remainder",
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
    "title": "personal",
    "iconName": "face-woman-shimmer-outline",
    "iconCommunity": "MaterialCommunityIcons",
    "children": [
      {
        "title": "your_name",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Your Name Screen"
      },
      {
        "title": "secure_access_pin",
        "onClick": (navigatFunction) => {
          navigatFunction();
        },
        "Screen": "Secure Accesss"
      },
      {
        "title": "calender_view"
      },
      {
        "title": "regional_setting"
      },
      {
        "title": "stats_updates"
      },
      {
        "title": "language"
      }
    ]
  },
  {
    "title": "my_data",
    "iconName": "database",
    "iconCommunity": "Octicons",
    "children": [
      {
        "title": "back_up_data"
      },
      {
        "title": "restore_data"
      },
      {
        "title": "delete_app_data"
      }
    ]
  },
  {
    "title": "other",
    "iconName": "setting",
    "iconCommunity": "AntDesign",
    "children": [
      {
        "title": "upgrade_to_premium"
      },
      {
        "title": "remove_ads"
      },
      {
        "title": "share_with_friends",
        onClick: ShareInfo
      },
      {
        "title": "security",
        onClick: onCreateTriggerNotification
      },
      {
        "title": "privacy"
      },
      {
        "title": "rate_app"
      }
    ]
  }
];
