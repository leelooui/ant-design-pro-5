import type { Effect, Reducer } from 'umi';


export interface ModalState {
  currentItem?: string,
  modalVisible?: boolean,
  modalType?: string,
  cardVisible?: boolean,
  intersection?: any,
  equipment?: [],
  intersections?: [],
  imageList?: []
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    showRoadModal: Reducer<ModalState>;
    hideRoadModal: Reducer<ModalState>;
    hideCard: Reducer<ModalState>;
    queryDateilData: Reducer<ModalState>;
    queryIntersectionData: Reducer<ModalState>;
  };
  effects: {
    fetch: Effect,
    showDetail: Effect,
  };
}

const initState: any = {
  currentItem: '',
  modalVisible: false,
  modalType: 'create',
  cardVisible: false,
  intersection: {},
  equipment: [],
  intersections: [ 
    {title:'T1',lnglat:[112.36298391357064, 28.56908932327269],controlPlan:false},
    {title:'T2',lnglat:[112.36080469921228, 28.555420066568512]}, 
    {title:'T3',lnglat:[112.36161546796563, 28.560148009931783],controlPlan:false},
  ],
  imageList:[]
};

const Model: ModelType = {
  namespace: 'amap',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) { 
       
    },
    *showDetail({ payload }, { call, put }) { 
      yield put({
        type: 'queryDateilData', 
      });
    }
  },
  reducers: {
    queryDateilData(state, { payload }) {
      return { ...state, ...payload,cardVisible: true}
    }, 
    queryIntersectionData(state, { payload }) {
      return { ...state}
    },
    showRoadModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideRoadModal(state, { payload }) {
      return { ...state,...payload, modalVisible: false }
    },
    hideCard(state, { payload }) {
      return { ...state,...payload, cardVisible: false }
    },
  },
};

export default Model;
