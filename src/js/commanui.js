const dialog = require('@electron/remote').dialog;
const app1= require('@electron/remote').app;
const path = require('path')
const child_process = require('child_process');
const { spawn } = require('child_process');
const {exec} = child_process
execPath = path.dirname (app1.getPath ('exe'));
configsavepath=path.join(execPath,"./defualt.json");
//判断文件是否存在
data ={
    "name": "请打开配置文件",
    "data": {
        "parameters": [

        ],
        "exefile": {
            "path":"",
            "lable":"请配置"
        },
        "value":2
    }
}


var fs = require('fs');

if (fs.existsSync(configsavepath)) {
    console.log('文件存在！');
    data = require(configsavepath);
} else {
    console.error('文件不存在！');
}






document.getElementsByTagName("title")[0].innerText = data.name

console.log(data)
var app = new Vue({
    el: "#app1",
    data: {
        configname: data.name,
        paramdata: data.data,
        outstr:""
    },
    methods: {
        openfilepath: function (item) {
            switch (item.buttoninfo.type) {
                case "infile": {
                    item.value = dialog.showOpenDialogSync({
                        title: "请选择" + item.lable,
                        properties: ['openFile'],
                    })
                    break;
                }
                case "outfile": {
                    item.value = dialog.showSaveDialogSync({
                        title: "请选择" + item.lable,
                        // properties: ['openFile'],
                    });
                    break;
                }
                case "path": {
                    item.value = dialog.showOpenDialogSync({
                        title: "请选择" + item.lable,
                        properties: ['openDirectory'],
                    });
                    break;
                }

            }

        },
        justopenfilepath: function (item,lablename) {
            item.path=dialog.showOpenDialogSync({
                title: lablename ,
                properties: ['openFile'],
            })
        },
        openconfigdata: function () {

            var datatempath = dialog.showOpenDialogSync({
                title: "请选择配置文件",
                properties: ['openFile'],
            })
            var datatemp = require(datatempath[0]);
            this.paramdata = datatemp.data;
            this.configname = datatemp.name;
            // console.log(datatemp)
            //将所选文件复制一份到config/defualt.json
            var defualtconfigpath =configsavepath;
            var fs = require('fs');
            fs.copyFile(datatempath[0], defualtconfigpath, (err) => {
                if (err) throw err;
                console.log('源文件已拷贝到目标文件');
            });
            document.getElementsByTagName("title")[0].innerText = datatemp.name

        }
        ,
        onexecclicked: function () {
            var exepath = this.paramdata.exefile.path;
            var parametersstr = "";
            var para = this.paramdata.parameters;
            var lenth = para.length;
            var retunstr = " ";
            for (let x in para) {

                if (para[x].value == "" &&para[x].unite != true) {
                    if (para[x].required) {
                        retunstr += "    " + para[x].lable + "     \r\n";
                    }


                }
                if (para[x].unite==true) {
                    parametersstr += para[x].option + " ";
                    retunstr=" ";
                    continue;
                }

                if (para[x].value != "") {
                    parametersstr += para[x].option + " " + para[x].value + " ";
                }

            }
            if (retunstr != " ") {
                alert("请选择 \r\n" + retunstr)
                return;
            }

            var exestr = exepath + " " + parametersstr;

            const exestrsp = spawn(exepath,parametersstr.split(" "));
            this.outstr="执行命令:\r\n"+exestr+"\r\n";
            exestrsp.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                this.outstr+="stdout: "+data+"\r\n";
            });
            exestrsp.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                this.outstr+="stderr: "+data+"\r\n";
            });
            exestrsp.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                this.outstr+="child process exited with code: "+code+"\r\n";
            });

            filedata=require(configsavepath);
            filedata.data=this.paramdata;
            //保存配置文件
            var fs = require('fs');
            fs.writeFile(configsavepath, JSON.stringify(filedata), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("数据写入成功！");
             });


            // exec(exestr, (error, stdout, stderr) => {
            //     console.log(error);
            //     console.log(stdout);
            //     flagg = stdout.split("\n");
            //     if (flagg[flagg.length - 1] == "sucess") {
            //         alert("执行成功")
            //     }
            //     console.log(stderr);
            // })
        }
    }


})


async function openDialog() {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'json', extensions: ['json']},
        ]
    });
    console.log("run here");
    console.log(result.filePaths[0]);
    outname = path.join(path.dirname(result.filePaths[0]), '\\',
        path.parse(result.filePaths[0]).name);
    console.log(outname);
    return outname + ".json";

}
