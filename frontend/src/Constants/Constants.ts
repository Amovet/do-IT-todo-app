
export const QUEUE = 'Queue';
export const DEVELOPMENT = 'Development';
export const DONE = 'Done';
export const ADD_TODO_WINDOW = 'ADD_TODO_WINDOW';
export const ADD_WORKSPACE_WINDOW = 'ADD_WORKSPACE_WINDOW';
export const LOW = 'low';
export const AVERAGE = 'average';
export const HIGH = 'high';
export const DARK = 'Dark';
export const LIGHT = 'Light';
export const TODO = 'TODO';
export const LATEST = 'latest';
export const OLDEST = 'oldest';

/*__________________TYPES FOR DETECT OUTSIDE CLICK_____________________*/

export const TODO_VALIDATION = 'TODO_VALIDATION';
export const TODO_UPDATE_DESCRIPTION = 'TODO_UPDATE_DESCRIPTION';
export const TODO_VALIDATE_AND_UPDATE_TITLE = 'TODO_VALIDATE_AND_UPDATE_TITLE';
export const WORKSPACE_VALIDATE_AND_UPDATE_TITLE = 'WORKSPACE_VALIDATE_AND_UPDATE_TITLE';
export const WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION = 'WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION';
export const VIEW_MORE = 'VIEW_MORE';
export const TODO_UPDATE_ENDTIME = 'TODO_UPDATE_ENDTIME';
export const SETTINGS = 'SETTINGS';
export const TODO_WITH_DATE = 'TODO_WITH_DATE';
export const TODO_IMPORTANCE = 'TODO_IMPORTANCE';
export const TODO_STATUS = 'TODO_STATUS';
export const ALL_TODO_TYPE = 'ALL_TODO_TYPE';
export const IMMEDIATE_TODO_TYPE = 'IMMEDIATE_TODO_TYPE';
export const SEARCH_MENU = 'SEARCH_MENU';
export const WORKSPACE_MENU = 'WORKSPACE_MENU';

/*__________________TYPES CONST INTERFACE_____________________*/
export const PRIORITY = [LOW,AVERAGE,HIGH]
export const STATUS = [QUEUE,DEVELOPMENT,DONE]
export const BACKGROUNDS =
    ['http://localhost:4444/uploads/background/Black_grid.jpg',
     'http://localhost:4444/uploads/background/Particles.jpg',
     'http://localhost:4444/uploads/background/Space.jpg',
     'http://localhost:4444/uploads/background/Waves.jpg',
     'http://localhost:4444/uploads/background/White.jpg']
export const THEME = [DARK,LIGHT]
export const SORT = [LATEST,OLDEST]

/*__________________TYPES CONST FOR DnD LOADER__________________*/
export const LOAD_USER_IMG = 'LOAD_USER_IMG';
export const LOAD_WORKSPACE_BACKGROUND = 'LOAD_WORKSPACE_BACKGROUND';