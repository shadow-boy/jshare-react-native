'use strict';

import React from 'react';
var {
  Component,
} = React;

import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import JShareModule from 'jshare-react-native';

const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  NativeAppEventEmitter,
  ScrollView,
  CameraRoll
} = ReactNative;

export default class MainActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: "",
      videoPath: "",
      emotionPath: ""
    }
     
    JShareModule.setup()
  }

  componentWillMount() {

    NativeAppEventEmitter.addListener('finishGetResource', (result) => {
      Alert.alert('das','fads')
        this.setState({ 
            imagePath: result.imagePath ,
            videoPath: result.videoPath,
            emotionPath: result.emotionPath,
          });
          console.log(this.state)
        });
  }

  onGetUserInfo = () => {
    var param = {
      platform: "wechat"
    };

    JShareModule.authorize(param, (map) => {
      // console.log(map);
      Alert.alert("getSocialUserInfo", JSON.stringify(map));
    }, (err) => {
      Alert.alert("errorCode: ", JSON.stringify(err));
    });
  }

  onPlatformAuth = () => {
    var param = {
      platform: "twitter"
    };
    JShareModule.isPlatformAuth(param, (result) => {
      console.log(param.platform + "is Auth: " + result);
    });
  }

  onRemoveAuthorize = () => {
    var param = {
      platform: "wechat_session"
    };
    JShareModule.cancelAuthWithPlatform(param, (code) => {
      if (code === 0) {
        console.log("remove authorize succeed" + code);
      } else {
        console.log("remove authorize failed, errorCode: " + code);
      }
    });
  }

  onShareTextPress = () => {
    var shareParam = {
      platform: "twitter",
      type: "text",
      text: "JShare test text",
      imagePath: ""
    };
    shareParam.imagePath = this.state.imagePath
    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareImagePress = () => {
    /* {
     *  type: 'image'
     *  platform: platformString  // 
     *  imagePath: String   // ?????????????????? imagePath, imageUrl imageArray ???????????????
     *  imageUrl: String // ?????????????????????????????? http ??? https ?????????imagePath, imageUrl imageArray ???????????????
     *  imageArray: [String]  // (??????: ????????? Qzone ?????????????????????) ?????????????????????????????????????????????????????????????????????????????? imagePath, imageUrl imageArray ???????????????
     * }
     */
    // Done
    console.log(this.state.path)

    var shareParam = {
      platform: "twitter",
      type: "image",
      text: "JShare test text",
      imageUrl: "",
      imagePath: ""
    }
    shareParam.imagePath = this.state.imagePath
    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareVideoPress = () => {
    /* {
     *  type: 'video'
     *  platform: platformString  // 
     *  title: String // ??????
     *  url: String // ?????? url
     *  text: String  // ??????
     *  imagePath: String // ???????????????????????????????????????
     *  
     *  videoUrl: String  // QQ ?????????????????? ??????
     * !! iOS ?????????????????????ALAsset???ALAssetPropertyAssetURL????????? PHAsset ??? localIdentifier???
     * }
     */
    var shareParam = {
      platform: "twitter",
      type: "video",
      title: "the video",
      text: "JShare test text",
      url: "http://v.youku.com/v_show/id_XMjkwNzMzMjgzNg==.html?spm=a2hww.20023042.m_224239.5~5!2~5~5!3~5~5~A",
      imagePath: "",
      videoUrl: "",
    };
    shareParam.imagePath = this.state.imagePath

    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareAudioPress = () => {
    
    /* {
     *  type: 'audio'
     *  platform: platformString  // 
     *  musicUrl: String //?????? ????????????????????? url
     *  url: String //???????????????????????? url
     *  imagePath: String   //??????????????????????????????????????????imagePath???imageUrl ???????????????
     *  imageUrl: String // ??????????????????????????????imagePath??? imageUrl ???????????????
     *  title: String // ?????? 
     *  text: String  // ??????
     * }
     */
    var shareParam = {
      platform: "twitter",
      type: "audio",
      musicUrl: "",
      text: "JShare test text",
      url: "www.jiguang.cn",
      title: "audio",
      imagePath: "",
    };
    shareParam.imagePath = this.state.imagePath

    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareFilePress = () => {
    var shareParam = {
      platform: "wechat_session",
      type: "file",
      path: "",
      fileExt: "to share file type"
    };
    shareParam.path = this.state.videoPath
    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareEmoticonPress = () => {
    var shareParam = {
      platform: "twitter",
      type: "emoticon",
      imagePath: ""
    };
    shareParam.imagePath = this.state.emotionPath
    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareAppPress = () => {
    // Done
    var shareParam = {
      platform: "twitter",
      type: "app",
      text: "JShare test text",
      title: "my app",
      url: "www.jiguang.cn",
      extInfo: "ext info string",
      path: ""
    };
    shareParam.path = this.state.imagePath

    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareLinkPress = () => {

     /* {
     *  type: 'link'
     *  platform: platformString  // 
     *  url: String // ??????????????? url
     *  imagePath: String // ??????????????????????????? imagePath???imageUrl ???????????????
     *  imageUrl: String // ??????????????????????????? imagePath imageUrl ???????????????
     *  title: String // ??????
     *  text: String // ??????
     * }
     */ 
    // Done
    var shareParam = {
      platform: "twitter",
      type: "link",
      url: "www.baidu.com",
      imagePath: "",
      imageUrl: "",
      title: " shared link",
      text: "the web link",
    };
    shareParam.imagePath = this.state.imagePath

    JShareModule.share(shareParam, (map) => {
      console.log("share succeed, map: " + map);
    }, (map) => {
      console.log("share failed, map: " + map);
    });
  }

  onShareLocalVideoPress = () => {


    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Videos',
    })
    .then(r => {
      // this.setState({ photos: r.edges });
      if (r.edges.length < 1) {
        Alert.alert("alert", "?????????????????????????????? 1 ???????????????")
        return
      }
      
      var shareParam = {
        platform: "twitter",
        type: "video",
        title: "the video",
        text: "JShare test text",
      };
      shareParam.videoAssetURL = r.edges[0]['node']['image']['uri']

      JShareModule.share(shareParam, (map) => {
        console.log("share succeed, map: " + map);
      }, (map) => {
        console.log("share failed, map: " + map);
      });
      })
      .catch((err) => {
        //Error Loading Images
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <TextInput 
            
            placeholder = { 'path' }
            multiline = { true }
            onChangeText = { (e) => { this.setState({path: e})} }>
          </TextInput>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onGetUserInfo}>
            <Text style = {styles.btnTextStyle}>
              Get userInfo
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onPlatformAuth}>
            <Text style = {styles.btnTextStyle}>
              Is Platform auth
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onRemoveAuthorize}>
            <Text style = {styles.btnTextStyle}>
              Remove authorize
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareTextPress}>
            <Text style = {styles.btnTextStyle}>
              Share Text
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareImagePress}>
            <Text style = {styles.btnTextStyle}>
              Share Image
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareVideoPress}>
            <Text style = {styles.btnTextStyle}>
              Share Video
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareAudioPress}>
            <Text style = {styles.btnTextStyle}>
              Share Audio
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareFilePress}>
            <Text style = {styles.btnTextStyle}>
              Share File
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareEmoticonPress}>
            <Text style = {styles.btnTextStyle}>
              Share Emoticon
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareAppPress}>
            <Text style = {styles.btnTextStyle}>
              Share App
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareLinkPress}>
            <Text style = {styles.btnTextStyle}>
              Share Link
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor = "#e4083f"
            activeOpacity = {0.5}
            style = {styles.btnStyle}
            onPress = {this.onShareLocalVideoPress}>
            <Text style = {styles.btnTextStyle}>
              share local video to facebook
            </Text>
          </TouchableHighlight>
          <FormButton
            title="getUserInfo"
            onPress={ () => {
              JShareModule.getSocialUserInfo({platform:'qq'}, (success) => {
                Alert.alert(JSON.stringify(success))
              }, (error) => {})

            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

class FormButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.title = props.title
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (!this.props.onPress) {
        return;
      }
    this.props.onPress();
  }

  render () {
    return (
        <TouchableHighlight
        underlayColor = "#e4083f"
        activeOpacity = {0.5}
        style = {styles.btnStyle}
        onPress = {this.onPress}>
        <Text style = {styles.btnTextStyle}>
              {this.props.title}
            </Text>

        </TouchableHighlight>
    )
}
}
var styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  btnTextStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff'
  },
  tagInput: {
		flex: 1,
		marginTop: 10,
		fontSize: 15,
		marginLeft: 5,
		marginRight: 5,
		height: 20,
		color: '#000000'
	},
});