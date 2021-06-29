import {
    NativeModules,
    Platform,
    DeviceEventEmitter
} from 'react-native';

const JShareModule = NativeModules.JShareModule;

export default class JShare {
    /**
     * iOS Only
     */
    static setup() {
        if (arguments[0] !== undefined) {
            console.warn('当前版本已经不需要在 setup 方法中传入参数。请复制 RCTJShareConfig.plist 文件到 XCode 工程中进行相关参数配置，详情请参考 iOS 配置文档。')
        } else {
        }
        JShareModule.setup();
    }

    /**
     * 获取SDK所有能用的平台名称，如要使用某个平台，必须在JGShareSDK.xml中配置。
     * Android only
     * @param {*} callback 返回值 list 是一个数组
     */
    static getPlatformList(cb) {
        JShareModule.getPlatformList((list) => {
            cb(list);
        });
    }

    /**
     * 分享
     * @param {object} message = {
     *
     * platformString 必填，用于分享置不同的平台 //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact'  / 'facebook' /'facebook_messenger' /'twitter' /'jchat_pro'
     * type 必填
     *
     * {
     *  type: 'text'
     *  platform: platformString  // 分享到指定平台
     *  text: String
     *  imagePath: // 选填，本地图片地址，新浪微博(iOS 不支持这个字段)
     *  appName: // 选填，应用名称，趣聊
     *  targetPkg: // 选填，点击消息时跳转应用的包名，趣聊	
     *  targetClass: // 选填，点击消息时跳转应用的类名，趣聊	
     *  extra: // 选填，点击消息跳转到第三方应用时带的extra信息，趣聊	
     *  url: // 选填，点击消息时跳转应用的url，趣聊	
     *  callBackUrl: // 选填，点击消息跳转第三方应用失败时，回调的url，趣聊
     * }
     *
     * {
     *  type: 'image'
     *  platform: platformString  // 分享到指定平台
     *  imagePath: String   // 本地图片路径 imagePath, imageUrl imageArray 必须三选一
     *  text: String  // 选填
     *  imageUrl: String // 网络图片地址，必须以 http 或 https 开头，imagePath, imageUrl imageArray 必须三选一
     *  imageArray: [String]  // (选填: 分享到 Qzone 才提供这个字段) 如果需要分享多张图片需要这个参数，数组中问题图片路径 imagePath, imageUrl imageArray 必须三选一
     *  appName: // 选填，应用名称，趣聊
     *  targetPkg: // 选填，点击消息时跳转应用的包名，趣聊	
     *  targetClass: // 选填，点击消息时跳转应用的类名，趣聊	
     *  extra: // 选填，点击消息跳转到第三方应用时带的extra信息，趣聊	
     *  url: // 选填，点击消息时跳转应用的url，趣聊	
     *  callBackUrl: // 选填，点击消息跳转第三方应用失败时，回调的url，趣聊
     * }
     *
     * {
     *  type: 'image_text'
     *  platform: platformString  // 分享到指定平台，目前只支持趣聊
     *  appName: String // 选填，应用名称，趣聊
     *  title: String // 选填，消息标题，趣聊	
     *  text: String // 消息内容，趣聊	
     *  imageUrl: String // 选填，缩略图网络图片地址，趣聊	
     *  targetPkg: String // 选填，点击消息时跳转应用的包名，趣聊	
     *  targetClass: String // 选填，点击消息时跳转应用的类名，趣聊	
     *  extra: String // 选填，点击消息跳转到第三方应用时带的extra信息，趣聊	
     *  url: String // 选填，点击消息时跳转应用的url，趣聊	
     *  callBackUrl: String // 选填，点击消息跳转第三方应用失败时，回调的url，趣聊
     * }
     *
     * {
     *  type: 'video'
     *  platform: platformString  // 分享到指定平台
     *  title: String // 选填
     *  url: String // 视频跳转页面 url
     *  text: String  // 选填
     *  imagePath: String // 选填，缩略图，本地图片路径

    *  videoAssetURL: string // videoAssetURL：系统相册视频文件的 url(videoAssetURL 正确格式: assets-library://asset/asset.MOV?id=872C1D2F-97FD-4B0B-9C21-A619E4F23293&ext=MOV) (iOS only)，facebook 只支持使用 videoAssetURL 来发送本地视频（不支持 url）。
    *  videoUrl: String  // QQ 空间本地视频 (iOS 不支持这个字段)
    * }
    *
    * {
    *  type: 'audio'
    *  platform: platformString  // 分享到指定平台
    *  musicUrl: String //必填 点击直接播放的 urlurl
    *  url: String //选填，点击跳转的 url
    *  imagePath: String   //选填，缩略图，本地图片路径，imagePath，imageUrl 必须二选一
    *  imageUrl: String // 选填，网络图片路径，imagePath， imageUrl 必须二选一
    *  title: String // 选填
    *  text: String  // 选填
    * }
    *
    * {
    *  type: 'file'
    *  platform: platformString  // 分享到指定平台
    *  path: String // 必填，文件路径
    *  fileExt: String // 必填，文件类型后缀
    *  tile: String
    * }
    *
    * {
    * type: 'emoticon'
    * platform: platformString  // 分享到指定平台
    * imagePath: String // 必填，本地图片路径
    * }
    *
    * {
    * type: 'app' // wechat_favourite 不支持
    * platform: platformString  // 分享到指定平台
    * url: String // 点击跳转 url
    * extInfo: String // 选填 第三方应用自定义数据
    * path: String // 选填 对应 app 数据文件
    * title: String // 选填
    * text: String // 选填
    * }
    *
    * {
    * type: 'link'
    * platform: platformString  // 分享到指定平台
    * url: String // 必填，网页 url
    * imagePath: String // 选填，本地图片路径 imagePath，imageUrl 必须二选一
    * imageUrl: String // 选填，网络图片地址 imagePath imageUrl 必须二选一
    * title: String // 选填
    * text: String // 选填
    * }
    *
    * {
    * type: 'undefined'
    * platform: platformString  // 分享到指定平台
    * }
    *
    * @param {Function} success = function (state) {} ##
    * state = {state: String} state = 'success' / 'fail' / 'cancel' / 'unknow'
        *
    * @param {Function} fail = function (error) {} ##
    * error = {code: number, descript: String}
    */
    static share(message, success, fail) {
        JShareModule.share(message, (map) => {
            success(map);
        }, (map) => {
            fail(map);
        });
    }

    /**
     * 获取社交平台用户信息
     * @param {Object} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' / 'facebook' / 'twitter' / 'jchat_pro'
     * }
     * @param {Function} success function (userInfo) {} 
     * userInfo = {
     *  name: String        
     *  iconUrl: String   // 社交平台头像链接
     *  gender: String    // 'female' /  'male'
     *  response: String  // 社交平台上的原始数据，为 json 格式字符串。
     * }
     *
     * @param {Function} fail = function (error) {} ## 
     * error = {code: number, descript: String}
     */
    static getSocialUserInfo(param, success, fail) {
        JShareModule.getSocialUserInfo(param, (map) => {
            success(map);
        }, (error) => {
            fail(error);
        });
    }

    /**
     * 判断某平台是否已经授权
     * 
     * @param {Object} param = {
     *  platform: String //可以是 'wechat_session' / 'qq' / 'sina_weibo' / 'facebook' /'facebook_messenger' / 'twitter' / 'jchat_pro'
     * }
     * @param {Function} callback = (Boolean) => {} 
     */
    static isPlatformAuth(param, cb) {
        JShareModule.isPlatformAuth(param, (result) => {
            cb(result);
        });
    }

    /**
     * Android Only
     * 判断平台是否支持授权
     * @param {Object} param  = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' / 'facebook' / 'facebook_messenger' / 'twitter' / 'jchat_pro'
     * }
     * @param {Function} cb = (boolean) => {}
     */
    static isSupportAuthorize(param, cb) {
        JShareModule.isSupportAuthorize(param, (result) => {
            cb(result);
        })
    }

    /**
     * 判断该平台的分享是否有效
     * Android only
     * @param {Object} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact'  / 'facebook' / 'facebook_messenger' / 'twitter' / 'jchat_pro'
     * }
     * @param {Function} callback = (Boolean) => {} 
     */
    static isClientValid(param, cb) {
        JShareModule.isClientValid(param, (result) => {
            cb(result);
        })
    }

    /**
     *  授权接口
     * @param {Object} param = {
     *  platform: String //可以是 'wechat' / 'qq' / 'weibo'  / 'facebook' / 'twitter' / 'jchat_pro'
     * }
     * @param {Function} success = {
     *     token: string,
     *     expiration: number,
     *     refreshToken: string,
     *     openId: string,
     *     originData: string // 授权登录返回的原始数据，为 json 格式字符串。
     * }
     * @param {Function} fail = {
     *     code: number,
     *     description: string,
     *     platform: string
     * }
     */
    static authorize(param, success, fail) {
        JShareModule.authorize(param, (map) => {
            success(map);
        }, (errorCode) => {
            fail(errorCode);
        });
    }

    /**
     * 删除用户授权本地数据
     * 
     * @param {Object} param = {
     *  platform: String //可以是 'wechat_session' / 
     *                           'wechat_timeLine' / 
     *                           'wechat_favourite' / 
     *                           'qq' / 
     *                           'qzone' /
     *                           'sina_weibo' /
     *                           'sina_weibo_contact' 
     *                           'twitter'/ 
     *                           'jchat_pro'/ 
     * }
     * @param {Function} callback = (Int) => {}
     * @code 返回码，0 表示成功删除
     */
    static cancelAuthWithPlatform(param, cb) {
        JShareModule.cancelAuthWithPlatform(param, (code) => {
            cb(code);
        });
    }

    /**
     * 检查不存在新浪客户端情况下的网页端是否登陆
     * 
     * iOS Only
     * @param {Function} success = (Boolean) => {} 
     */
    static isSinaWeiboWebLogined(success) {
        JShareModule.isSinaWeiboWebLogined(success)
    }

    /**
     * 登出新浪网页端最新帐号
     * 
     * iOS Only
     * @param {Function} success = (Boolean) => {} 
     */
    static sinaWeiboWebLogOut(success) {
        JShareModule.sinaWeiboWebLogOut(success)
    }

    /**
     * 检查是否安装微信客户端
     *
     * @param {Function} success = (Boolean) => {} 
     */
    static isWeChatInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "wechat_session"},success)
        } else {
            JShareModule.isWeChatInstalled(success)
        }
    }

    /**
     * 检查是否存在 QQ 客户端
     * 
     * @param {Function} success = (Boolean) => {}
     */
    static isQQInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "qq"},success)
        } else {
            JShareModule.isQQInstalled(success)
        }
    }

    /**
     * 检查是否存在 Facebook 客户端
     * 
     * @param {Function} success = (Boolean) => {}
     */
    static isFacebookInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "facebook"},success)
        } else {
            JShareModule.isFacebookInstalled(success)
        }
    }


    /**
     * 检查是否存在新浪微博客户端
     * 
     * @param {Function} success = (Boolean) => {}
     */
    static isSinaWeiBoInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "sina_weibo"},success)
        } else {
            JShareModule.isSinaWeiBoInstalled(success)
        }
    }

    /**
     * 检查是否存在twitter客户端
     * 
     * @param {Function} success = (Boolean) => {}
     */
    static isTwitterInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "twitter" }, success);
        } else {
            JShareModule.isTwitterInstalled(success)
        }
    }

    /**
     * 检查是否存在趣聊客户端
     * 
     * @param {Function} success = (Boolean) => {}
     */
    static isJchatProInstalled(success) {
        if (Platform.OS === 'android') {
            JShareModule.isClientValid({ platform: "jchat_pro" }, success);
        } else {
            
        }
    }
    
    /**
     * 
     * @param {Object} param = {
     *  enable: Boolean
     * }
     */
    static setDebug(param) {
        JShareModule.setDebug(param)
    }

}
