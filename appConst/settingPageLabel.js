import { ShareInfo, onCreateTriggerNotification } from "../utility/helperFunction";

const navigation = () => {

}

export default [
  {
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
  {
    "title": "Reminders",
    "iconName": "bell",
    "iconCommunity": "Entypo",
    "children": [
      {
        "title": "Cyde reminders"
      },
      {
        "title": "Medicine reminder",
        "onClick": (navigatFunction) => {
          navigatFunction();
        }
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
  {
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
