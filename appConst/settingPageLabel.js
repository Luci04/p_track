import { ShareInfo, onCreateTriggerNotification } from "../utility/helperFunction";

export default {
  "My Cycle": {
    "title": "My Cycle",
    "iconName": "water-drop",
    "iconCommunity": "MaterialIcons",
    "children": [
      {
        "title": "Pericxi prediction"
      },
      {
        "title": "Ovulation and fertility prediction"
      },
      {
        "title": "Pregnancy"
      }
    ]
  },
  "Reminders": {
    "title": "Reminders",
    "iconName": "bell",
    "iconCommunity": "Entypo",
    "children": [
      {
        "title": "Cyde reminders"
      },
      {
        "title": "Medicine reminder"
      },
      {
        "title": "Contraception reminders"
      },
      {
        "title": "Meditation remainder"
      },
      {
        "title": "Daily logging remainder"
      },
      {
        "title": "Tracking remainders"
      },
      {
        "title": "Secret reminders"
      }
    ]
  },
  "Personal": {
    "title": "Personal",
    "iconName": "face-woman-shimmer-outline",
    "iconCommunity": "MaterialCommunityIcons",
    "children": [
      {
        "title": "Your Name"
      },
      {
        "title": "Secure access (PIN)"
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
  "My Data": {
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
  "Other": {
    "title": "Other",
    "iconName": "setting",
    "iconCommunity": "AntDesign",
    "children": {

      "Upgrade to Premium": {
        "title": "Upgrade to Premium"
      },
      "Remove ads":
      {
        "title": "Remove ads"
      },
      "Share with friends":
      {
        "title": "Share with friends",
        onClick: ShareInfo
      },
      "Security":
      {
        "title": "Security",
        onClick: onCreateTriggerNotification
      },
      "Privacy":
      {
        "title": "Privacy"
      },
      "Rate app":
      {
        "title": "Rate app"
      }
    }
  }
}
