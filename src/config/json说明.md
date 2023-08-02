```json
{
  "name": "软件数据导出",  //软件名称
  "data": {
    "parameters": [      //程序的参数列表 每个列表一个对象 列表
      {
        "type": "text",  //参数所需值的类型 路径一般也是txt
        "isneedbutton": true, //是否需要按钮 路径一般需要一个打开按钮
        "buttoninfo": {
          "type": "infile"   //按钮类型 infile 输入路径 outfile 输出路径
        },
        "name": "SBGBinfilepath", //参数名称
        "lable": "SBGBin", //参数的显示名称
        "required": true, //是否式必须的
        "value": "",  //默认值
        "option": "-g", //参数选项
      }
    ],
    "exefile": {
      "path":"D:\\03product\\software\\tool\\extradatafrombin.exe", //程序路径
      "lable":"开始导出" //程序显示标签
    },
    "value":2 //暂定
  }
}
```
