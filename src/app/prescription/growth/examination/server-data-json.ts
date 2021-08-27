export const DATA = {
  "threeMonthsForm": {
    "title": "3 Months Examination",
    "formName": "threeMonthsForm",
    "id": "one",
    "tabName": "3 Months",
    "status": "false",
    "icons": null,
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "ofc",
      "type": "input",
      "formName": "ofc",
      "required": "true",
      "placeholder": "Enter ofc",
      "unit":{
        "name": "ofcUnit",
        "type": "select",
        "required": "true",
        "formName": "ofcUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 5
      }
    },
    {
      "name": "Murmur",
      "type": "radio",
      "formName": "murmur",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "BCG nodule",
      "type": "checkbox",
      "formName": "bcg_nodule",
      "checkboxContent": "CH",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Abdominal Mass",
      "type": "radio",
      "formName": "abdominal_mass",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Genitalia",
      "type": "radio",
      "formName": "genitalia",
      "required": "true",
      "options": [{
        "label": "normal",
        "value": "0"
      },
      {
        "label": "Abnormal",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Umbilical stump healthy",
      "type": "radio",
      "formName": "stump",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "required": "true",
      "formName": "vaccine",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Reinforcement about breastfeeding",
      "type": "checkbox",
      "required": "true",
      "formName": "breast_feeding",
      "checkboxContent": "Done",
      "flex": {
        "level_1": 4,
        "level_2_a": 9,
        "level_2_b": 3
      }
    },
    {
      "name": "specify",
      "type": "input",
      "required": "true",
      "formName": "breast_feeding_specify",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 7,
        "level_2_a": 2,
        "level_2_b": 10
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "eyesFollowMovingObject",
      "displayName": "Eyes follow moving objects"
    },
    {
      "name": "searchesWithEyeTowardsSound",
      "displayName": "Searches with eye towards sound"
    },
    {
      "name": "proneSuspension",
      "displayName": "Prone suspension - head held above the level of body"
    },
    {
      "name": "socialSmile",
      "displayName": "Social smile"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social":[
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "sixMonthsForm": {
    "title": "6 Months Examination",
    "id": "two",
    "tabName": "6 Months",
    "status": "false",
    "icons": null,
    "formName": "sixMonthsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "ofc",
      "type": "input",
      "formName": "ofc",
      "required": "true",
      "placeholder": "Enter ofc",
      "unit":{
        "name": "ofcUnit",
        "type": "select",
        "required": "true",
        "formName": "ofcUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 5
      }
    },
    {
      "name": "Murmur",
      "type": "radio",
      "formName": "murmur",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Weight gain",
      "type": "radio",
      "formName": "weight_gain",
      "required": "true",
      "options": [{
        "label": "Adequate",
        "value": "1"
      },
      {
        "label": "Inadequate",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Abdominal Mass",
      "type": "radio",
      "formName": "abdominal_mass",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Genitalia",
      "type": "radio",
      "formName": "genitalia",
      "required": "true",
      "options": [{
        "label": "normal",
        "value": "0"
      },
      {
        "label": "Abnormal",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Complementary feeding advice",
      "type": "checkbox",
      "formName": "feedingAdvice",
      "required": "true",
      "checkboxContent": "Done",
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Reinforcement about breastfeeding",
      "type": "checkbox",
      "required": "true",
      "formName": "breast_feeding",
      "checkboxContent": "Done",
      "flex": {
        "level_1": 4,
        "level_2_a": 9,
        "level_2_b": 3
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "laughsAloud",
      "displayName": "Laughs aloud"
    },
    {
      "name": "sitsProperly",
      "displayName": "Sits propped - head steady, back curved slightly"
    },
    {
      "name": "retainsRedDanglingRing",
      "displayName": "Retains red dangling ring"
    },
    {
      "name": "searchSpeaker",
      "displayName": "Searches for the speaker"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "nineMonthsForm": {
    "title": "9 Months Examination",
    "id": "three",
    "tabName": "9 Months",
    "status": "false",
    "icons": null,
    "formName": "nineMonthsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "ofc",
      "type": "input",
      "formName": "ofc",
      "required": "true",
      "placeholder": "Enter ofc",
      "unit":{
        "name": "ofcUnit",
        "type": "select",
        "required": "true",
        "formName": "ofcUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Diet check",
      "type": "checkbox",
      "formName": "diet_check",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 7,
        "level_2_a": 2,
        "level_2_b": 5
      }
    },
    {
      "name": "Rickets",
      "type": "radio",
      "formName": "rickets",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "1"
      },
      {
        "label": "Absent",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Physical examination",
      "type": "checkbox",
      "formName": "physical_examination",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 7,
        "level_2_a": 2,
        "level_2_b": 5
      }
    },
    {
      "name": "Anaemia",
      "type": "radio",
      "formName": "anaemia",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "0"
      },
      {
        "label": "Absent",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "pincerGrasp",
      "displayName": "Pincer grasp"
    },
    {
      "name": "sitsProperlyBackStraight",
      "displayName": "Sits propped - back straight on floor"
    },
    {
      "name": "peekABoo",
      "displayName": "Enjoys peek-a-boo"
    },
    {
      "name": "response to name",
      "displayName": "Responds to name with head turn, eye contact, smile"
    },
    {
      "name": "turningOver",
      "displayName": "Turning over from either direction ( prone to supine and vice versa)"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "twelveMonthsForm": {
    "title": "12 Months Examination",
    "id": "four",
    "tabName": "12 Months",
    "status": "false",
    "icons": null,
    "formName": "twelveMonthsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "ofc",
      "type": "input",
      "formName": "ofc",
      "required": "true",
      "placeholder": "Enter ofc",
      "unit":{
        "name": "ofcUnit",
        "type": "select",
        "required": "true",
        "formName": "ofcUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Diet check",
      "type": "checkbox",
      "formName": "diet_check",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 7,
        "level_2_a": 2,
        "level_2_b": 5
      }
    },
    {
      "name": "Potty training",
      "type": "checkbox",
      "formName": "potty_training",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Rickets",
      "type": "radio",
      "formName": "rickets",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "1"
      },
      {
        "label": "Absent",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 5,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Physical examination",
      "type": "checkbox",
      "formName": "physical_examination",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Anaemia",
      "type": "radio",
      "formName": "anaemia",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "0"
      },
      {
        "label": "Absent",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Dentition ( First tooth should have erupted by 13 months )",
      "type": "radio",
      "formName": "anaemia",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "0"
      },
      {
        "label": "No",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 12,
        "level_2_a": 4,
        "level_2_b": 3
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "stand",
      "displayName": "Stands alone"
    },
    {
      "name": "saysMamaDada",
      "displayName": "Says “mama” and “dada”"
    },
    {
      "name": "imitation",
      "displayName": "Imitates sounds, gestures or actions to get parent's attention"
    },
    {
      "name": "looksAtPics",
      "displayName": "Looks at the correct picture when it's named"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "eighteenMonthsForm": {
    "title": "18 Months Examination",
    "id": "five",
    "tabName": "18 Months",
    "status": "false",
    "icons": null,
    "formName": "eighteenMonthsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "ofc",
      "type": "input",
      "formName": "ofc",
      "required": "true",
      "placeholder": "Enter ofc",
      "unit":{
        "name": "ofcUnit",
        "type": "select",
        "required": "true",
        "formName": "ofcUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 4,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Diet check",
      "type": "checkbox",
      "formName": "diet_check",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 7,
        "level_2_a": 2,
        "level_2_b": 5
      }
    },
    {
      "name": "Rickets",
      "type": "radio",
      "formName": "rickets",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "1"
      },
      {
        "label": "Absent",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Anaemia",
      "type": "radio",
      "formName": "anaemia",
      "required": "true",
      "options": [{
        "label": "Present",
        "value": "0"
      },
      {
        "label": "Absent",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Dentition ( First tooth should have erupted by 13 months )",
      "type": "radio",
      "formName": "anaemia",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "0"
      },
      {
        "label": "No",
        "value": "1"
      }
      ],
      "flex": {
        "level_1": 12,
        "level_2_a": 4,
        "level_2_b": 3
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "walk",
      "displayName": "Walks independently"
    },
    {
      "name": "soundResponse",
      "displayName": "Responds to word or command with appropriate actions"
    },
    {
      "name": "ballThrow",
      "displayName": "Throws small ball"
    },
    {
      "name": "understandNo",
      "displayName": "Understand 'No'"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "threeYearsForm": {
    "title": "3 Years Examination",
    "id": "six",
    "status": "false",
    "icons": null,
    "tabName": "3 Years",
    "formName": "threeYearsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "ADHD screening",
      "type": "checkbox",
      "formName": "adhd",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Dental examination ( formal dental examination )",
      "type": "checkbox",
      "formName": "dental",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Eyes examination ( formal ophthalmology consultation )",
      "type": "checkbox",
      "formName": "eyes",
      "checkboxContent": "Advised",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "runForward",
      "displayName": "Run forward well"
    },
    {
      "name": "fullName",
      "displayName": "Gives full name"
    },
    {
      "name": "turnPage",
      "displayName": "Turns single page of a book"
    },
    {
      "name": "nameThings",
      "displayName": "Names common pictures and things"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  },
  "fiveYearsForm": {
    "title": "5 Years Examination",
    "id": "seven",
    "tabName": "5 Years",
    "status": "false",
    "icons": null,
    "formName": "fiveYearsForm",
    "section_one": [{
      "name": "Weight",
      "type": "input",
      "formName": "weight",
      "required": "true",
      "placeholder": "Enter weight",
      "unit":{
        "name": "weightUnit",
        "type": "select",
        "required": "true",
        "formName": "weightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "Kg"
        },
        {
          "label": "lbs"
        },
        {
          "label": "g"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Height",
      "type": "input",
      "formName": "height",
      "required": "true",
      "placeholder": "Enter height",
      "unit":{
        "name": "heightUnit",
        "type": "select",
        "required": "true",
        "formName": "heightUnit",
        "placeholder": "unit",
        "options": [{
          "label": "cm"
        },
        {
          "label": "m"
        }
        ,
        {
          "label": "ft"
        }
        ]
      },
      "flex": {
        "level_1": 4,
        "level_2_a": 3,
        "level_2_b": 6
      }
    },
    {
      "name": "Anthropometry centiles charting",
      "type": "checkbox",
      "formName": "a_c_charting",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Blood pressure",
      "type": "checkbox",
      "formName": "bloodPressure",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Dental examination ( formal dental examination )",
      "type": "checkbox",
      "formName": "dental",
      "checkboxContent": "Done",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Eyes examination ( formal ophthalmology consultation )",
      "type": "checkbox",
      "formName": "eyes",
      "checkboxContent": "Advised",
      "required": "true",
      "flex": {
        "level_1": 6,
        "level_2_a": 6,
        "level_2_b": 6
      }
    },
    {
      "name": "Vaccines given as per schedule",
      "type": "radio",
      "formName": "vaccine",
      "required": "true",
      "options": [{
        "label": "Yes",
        "value": "1"
      },
      {
        "label": "No",
        "value": "0"
      }
      ],
      "flex": {
        "level_1": 4,
        "level_2_a": 4,
        "level_2_b": 8
      }
    },
    {
      "name": "Food",
      "type": "select",
      "required": "true",
      "formName": "food",
      "placeholder": "Enter food type...",
      "options": [{
        "label": "Breast feeding"
      },
      {
        "label": "Breast feeding, add sips of water"
      },
      {
        "label": "Supplements to be added in diet along with water"
      },
      {
        "label": "Solid Food"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Eye sight",
      "type": "select",
      "required": "true",
      "formName": "eyesight",
      "placeholder": "Enter vision...",
      "options": [{
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Vision is in black and white shades of grey.Eyesight to be tested"
      },
      {
        "label": "Vision is in black and white shades of grey.Can focus on objects from  8-10 inches"
      },
      {
        "label": "Vision is in black and white shades of grey"
      },
      {
        "label": "Develops colour vision.Follow when shown a bright colored toy"
      },
      {
        "label": "Ability to determine the distance of objects"
      },
      {
        "label": "Judge distance more accuratly .Hence throw things with precision"
      },
      {
        "label": "See very clearly and focus.Even on fast moving objects"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Exercise",
      "type": "select",
      "required": "true",
      "formName": "exercise",
      "placeholder": "Exercise...",
      "options": [{
        "label": "Grip,bicycle,chest cross,elbow stand"
      },
      {
        "label": "Toe to ear,handwalking ,mountain climbing exercises to improve strenght"
      },
      {
        "label": "Hip lift,touch and hug,squat,head to toe"
      },
      {
        "label": "Board walk,train track to improve eye -foot coordination,run,climb,jump"
      }
      ],
      "flex": {
        "level_1": 6,
        "level_2_a": 3,
        "level_2_b": 9
      }
    },
    {
      "name": "Any other significant physical finding",
      "type": "input",
      "required": "true",
      "formName": "other_finding",
      "placeholder": "Enter comments...",
      "flex": {
        "level_1": 12,
        "level_2_a": 3,
        "level_2_b": 8
      }
    }
    ],
    "section_two": [{
      "name": "swingsHops",
      "displayName": "Swings, hops, somersaults"
    },
    {
      "name": "counting",
      "displayName": "Can count 10 or more objects"
    },
    {
      "name": "sayNameAndAddress",
      "displayName": "Can say name and address"
    },
    {
      "name": "singAndDance",
      "displayName": "Likes to sing and dance"
    }
    ],
    "section_three": {
      "motor": [
        {
          "name": "Catches bounced ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pour beverages and mashes own food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does somersaults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses a fork and spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can stand on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Use toilet without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Swings and climbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Arms bent at elbow while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does sharp turns while running",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw circle without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw a person with two body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draw square without seeing an example",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Throws a ball overhand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands on tiptoes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Climbs on and off furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts simple puzzles together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks up and down stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "jumps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pedals tricycle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns rotating handles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Presses modeling clay",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does not drop objects intentionally",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses body to propel while throwing an object",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Kicks a ball in specific direction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Traces line drawn with finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make horizontal or vertical strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make circular strokes while drawing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops in middle of run",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump with both feet on a single spot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a small step",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jump down a height of approx 18 inches",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Jumps backward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hops on one foot",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "User scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pastes material on sheet of paper",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold pencil in writing position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stand alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks alone",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Run and walk up steps",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Walks backward pulling toy",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Feeds self with spoon and drinks with cup",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps dress and undress self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Picks objects with index finger and thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasps objects with finger tips",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Places objects in container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Go from sitting to kneeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Goes from standing up to sqautting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can carry object while walking",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying down,supports weight with one arm",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Change direction while crawling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawls up stairs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wrinkles paper with hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Starts and stops a toys movement",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses handle for a door or drawer",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects with single hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Twists bottle cap",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stops rolling ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to catch  a ball",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles randomly ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "In and out of sitting position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits well without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Creeps or crawls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stands holding on",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Take steps while holding on to furniture",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm ,using all fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Takes object out of container",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Drags to take objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Let go of objects voluntarily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "head steady without support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grabs and shakes toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes down on legs when feet placed on hard surface",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pushes up to elbows when lying on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks from side to side",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls over",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to sit with help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Supports weight on both legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rocks back and forth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Crawl backward before moving forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, holds feet",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hold objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for objects with both hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds two objects,one in each hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers objects from one hand to another",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sits with support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Rolls to face up position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds objects with palm without using thumb",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,stretches out to reach something",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "While lying face down,extends arm forward",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Comforts self by sucking fingers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Keeps hands closed",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "arms,knees tucked into abdomen and in flexed position",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs reflexively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "turn towards hands,when cheek is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Blinks at lights",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Raises head and lie on stomach",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Head up on support",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds head up",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Make movements with arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms and both legs well",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Brings hands to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lye on stomach,lifts head and chest",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves arms,legs vigorously",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows head control",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Grasp fingers when placed in babys hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When startled shows motor reflexes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Spreads toes when foot is stroked",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startled by loud noise",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts when touched",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns towards direction of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Fixate eyesight at objects 18 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks back and forth at different objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts differently to hot and cold",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to smells",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Preference for food",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When upright can turn head left and right",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can open and close hands",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Stretches arms and legs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "When lying face up, raises legs by few inches",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "communication": [
        {
          "name": "Tells stories and recalls stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows basic grammer and use words correctly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sing a song",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates clearly",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tells story in complete sentences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says name and address",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses future tense such as “I will be there”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Speaks using plurals",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says rhyming words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses words together",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows names of familiar people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses three-word sentences and carries on a conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand common verbs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Holds up finger to tell age",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name objects after hearing sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Name places looking at images",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses simple gestures like waving “bye-bye.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “mama” and “dada.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to say words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to “are you all done?”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says three or more single words.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate two-word phrases like “all done.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to show what he/she wants.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Says “no” and shakes head.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points to “mom” and “dad”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds like “bababa,” “dadada,” “mamama.”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies gestures such as nodding head for “yes”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Points at things.",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to change in tone of sound",
          "checked": false
        },
        {
          "name": "Hear properly and respond at times",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Hear properly and responds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Laughs aloud",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry, in pain or tired",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbles more than two vowel sounds (“ah,” “eh,” “oh”)",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Say consonant sounds like “b” and “m”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "First vowel -like words",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries to communicate",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Babbling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reacts to familiar sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for source of sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Excited to hear different sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Smacks lips when hungry",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Yawns when overstimulated",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes cooing sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns head toward sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Chuckles in response to you",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when hungry or uncomfortable",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes gurgling noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses possessive words,such as “mine”",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "social": [
        {
          "name": "Plays cooperatively",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Negotiates solutions to conflicts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to play with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoy new things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "More creative in make-believe play",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Confuses what’s real and what’s make-believe",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Expresses likes and dislikes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Seeks new experiences",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to please friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Wants to be like friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Agrees to rules more easily",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Likes to sing, dance and act",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate fantasy and reality",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can differentiate boy and girl",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Demonstrates both demanding and cooperative behaviors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays with other children",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates others",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows more and more independence",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows defiance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows concern and affection",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies adults and friends",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Separates easily from parents",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows different feelings",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys routines, gets upset with major change",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dresses self",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys helping",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Verbalizes toilet needs and may be toilet trained during the day",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Can use a spoon",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Put on shoes without ties",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses cup with one hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Prefers certain people and toys",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitates sounds, gestures etc to get parent's attention",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves and is shy around strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Helps with dressing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shy or anxious with strangers",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Eat without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Know to use personal hygiene objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by smiling, crying etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Clings to familiar adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries when parent leaves",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to own name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs spontaneously at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows excitement by waving",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Calms and stops crying when comforted",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys playing with people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows familiar faces and know if someone is a stranger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks at self in mirror",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to people’s emotions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Makes sounds to express happiness or displeasure",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Strecthes arms to be carried",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows feelings by crying",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses face and body to show feeling",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Interested in watching your face",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Begins to smile,laugh at parent",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows parent with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets to familiar voice or touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "smiles,laughs at people",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Enjoys hugs and cuddles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to faces",
          "checked": false,
          "month": null,
          "year": null
        }
      ],
      "cognitive": [
        {
          "name": "Copies simple shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands “same” and “different”",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "counting",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws a person",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses scissors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies letters",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays board games",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Counts 10 or more objects",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understands items common items like food or money",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Copies geometric shapes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes own printed name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Write name",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Remember parts of story ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Builds tower with blocks",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finds things even when hidden",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores how things work",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sort shapes and colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows two-step directions",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Names items in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Completes sentences familiar books",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Does puzzles",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Draws or copies a circle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays make-believe with dolls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses imagination to create stories",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Works toys with buttons, levers etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what “two” means",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages one at a time",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows common colors",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Portrays family members while playing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Matches objects to photographs",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Finishes sentences from books ",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand functioning of one or more body parts",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sings song from memory",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognize different musical instrument",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Explores things by banging, shaking or throwing",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pokes with index finger",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Lets go of things without help",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Turns pages in a book",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Puts things in mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Scribbles with crayon or pencil",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Knows what common objects are for",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Shows interest in a stuffed animal or doll",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Identify animals by their sound",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Understand objects have shape,texture etc",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses object properly after observing adults",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Responds to music",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Dances to song beats",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to sing along",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows simple instruction",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Has a sense of location",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pays attention to book reading",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches an object as it falls",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks for objects you hide",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Transfers things from hand to hand",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Plays “peek-a-boo“",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Imitate simple actions or gestures",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Moves eyes from side to side to watch objects move",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Communicates if happy or sad",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches face while feeding",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Reaches for toys and brings toys to mouth",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Uses hands and mouth to explore the world",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Tries to get out of reach things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Looks around at things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Closely observes how you do things",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Pay attention to conversation",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sees objects eight to 12 inches away",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Sensitive to sounds",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Startles to loud noises",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Quiets in response to your touch",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Watches and follows moving object with eyes",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes familiar people at a distance",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Cries or fusses if bored",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Recognizes breast or bottle",
          "checked": false,
          "month": null,
          "year": null
        },
        {
          "name": "Follows movement by turning head",
          "checked": false,
          "month": null,
          "year": null
        }
      ]
    }
  }
}
export const OTHER_DATA = {
  "milestones": [{
    "name": "Physical or Motor Development",
    "formName": "motor",
    "icon":"../../../../assets/child_examination_motor.svg"
  },
  {
    "name": "Communication & Language",
    "formName": "communication",
    "icon":"../../../../assets/child_examination_comm.svg"
  },
  {
    "name": "Social & Emotional Milestones",
    "formName": "social",
    "icon":"../../../../assets/child_examination_emotional.svg"
  },
  {
    "name": "Cognitive Milestones",
    "formName": "cognitive",
    "icon":"../../../../assets/child_examination_cognitive.svg"
  }
  ],
  "teethChart": {
    "rows": [
      {
        "Name": "Upper central incisor",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Upper lateral incisor",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Upper canine(cuspid)",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Upper First molar",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Upper second molar",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Lower central incisor",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Lower lateral incisor",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Lower canine(cuspid)",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Lower First molar",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      },
      {
        "Name": "Lower second molar",
        "checklist_1": {
          "value": false,
          "month": null,
          "year": null
        },
        "checklist_2": {
          "value": false,
          "month": null,
          "year": null
        }
      }
    ],
    "headers": ["Teeth Name", "Tooth came in", "Tooth fallen out"]
  }
}
