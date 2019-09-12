//  小程序观察者
const Observer = {
    /**
     *小程序实例监听
     */
    appListener: (App, appLifecycle, args) => {
        if ('onLaunch' == appLifecycle) {
            console.log('ironm_app_onLaunch', args[0]);
        } else if ('onHide' == appLifecycle) {
            console.log('ironm_app_onHide');
        } else if ('onShow' == appLifecycle) {
            console.log('ironm_app_onShow');
        }
    },

    /**
     *页面实例监听
     */
    pageListner: (Page, pageLifecycle, args) => {
        //当在onShow生命周期中时
        if ('onShow' == pageLifecycle) {
            //常量写在等号左边防止错误写少一个=号时，不会报错
            console.log('ironm_page_onShow');
        } else if ('onLoad' == pageLifecycle) {
            console.log('ironm_page_onLoad:', args[0]);
        } else if ('onHide' == pageLifecycle) {
            console.log('ironm_page_onHide');
        } else if ('onReady' == pageLifecycle) {
            console.log('ironm_page_onReady');
        } else if ('onUnload' == pageLifecycle) {
            console.log('ironm_page_onUnload');
        } else if ('onPullDownRefresh' == pageLifecycle) {
            console.log('ironm_page_onPullDownRefresh:', args[0]);
        } else if ('onReachBottom' == pageLifecycle) {
            console.log('ironm_page_onReachBottom:', args[0]);
        } else if ('test' == pageLifecycle) {
            console.log('ironm_page_test');
        }
    },

    /**
     * 点击方法监听
     */
    clickListener: (e, t) => {
        console.log('Click on ', e.type, Date.now());
    },

    /**
     * 分享实例监听
     */
    shareListener: (event, Observer, retObj) => {
        console.log('share_program', event, Observer, retObj);
    }
};

//  工具相关参数与方法
const Instrument = {
    defaultPageCallbacks: {}, //页面回调函数对象
    defaultAppCallbacks: {}, //小程序实例回调函数对象
    appHandlers: ['onLaunch', 'onShow', 'onHide'],
    pageHandlers: ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'test', 'onRoute'],
    clickEventTypes: ['tap', 'submit', 'cancel', 'confirm'],
    shareEventTypes: ['onShareAppMessage'],
    originalPage: Page, //保存原生Page函数
    originalApp: App, //保存原生App函数

    initInstrument: observer => {
        // 将小程序观察者赋值给工具对象的 observer
        Instrument.observer = observer;

        // 为页面生命周期绑定监听方法
        Instrument.pageHandlers.forEach(pageLifecycle => {
            Instrument.defaultPageCallbacks[pageLifecycle] = function() {
                /**
                 * this 当前作用域
                 * pageLifecycle: 页面生命周期名称
                 */
                Instrument.observer.pageListener(this, pageLifecycle, arguments);
            };
        });

        //二：为App生命周期绑定监听方法
        Instrument.appHandlers.forEach(function(appLifecycle) {
            Instrument.defaultAppCallbacks[appLifecycle] = function() {
                Instrument.observer.appListener(this, appLifecycle, arguments);
            };
        });

        Instrument.Page = function() {
            console.log('------1111111 page 1111111-------');
            //修改原生Page函数
            // Instrument.ZaPage(arguments[0]);
        };

        App = function() {
            console.log('------2222222 App 2222222-------');
            // Instrument.ZaApp(arguments[0]);
            //arguments[0]为传入App函数的整个对象（包含onLaunch,onHide等App生命周期）
        };
    }
};

const start = () => {
    Instrument.initInstrument(Observer);
};

export default start;
