Component({
  properties: {
    // yichexiao1 | kong | tuideng | shuxian | qiangbi | wenhao | haimianbaobao- | xuanzhong | jiegu1 | duichangicon1 | fenzu | add-fill | add-copy | add | cuo | cuo-copy | shanchu_fasle-copy | shanchuanniucopy | shanchu | dengdai | queren_font | queren_duigou | queren_renxing | baoming | qingjiazhong | leave | weidu | yidu | Group | fleet | find | richenganpai | scan | zhuangtai | zhuangtai1 | coach | feedback | QrCode | yuyue | you | noSex | women-copy
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
