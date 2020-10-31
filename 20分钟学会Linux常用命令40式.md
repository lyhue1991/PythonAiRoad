# 20分钟学会Linux常用命令40式


#### 一，目录管理


1, ls 查看目录下文件

例1：ls -a 查看全部目录，包含隐藏目录  

例2：ls -l 查看当前目录详细列表， 

例3：ls -lt  查看当前目录详细列表，按时间顺序排序，最近修改的文件在前面

例3：ls -ltr  查看当前目录详细列表，按时间顺序逆序排序，最近修改的文件在后面


2, cd  切换目录

例1：cd .. #切换到上级目录, linux中一个点表示当前路径，二个点表示当前路径上级路径

例2：cd ~ #切换到主目录 

例3：cd /User/liangyun03/ # 切换到某个绝对路径，linux中以/开头的路径表示绝对路径

例4：cd  data/pictures/ # 切换到当前路径下某个相对路径，linux中不以/开头的路径表示相对路径



3, pwd 当前工作目录

例：pwd #查看当前工作目录完整路径


4, mkdir 建立文件夹

例： mkdir document #建立文件夹document


5, rmdir 删除空文件夹 

如果是删除非空文件夹，一般要用 rm -rf document


```bash

```

#### 二，文件操作


6， cp 复制文件

例：cp xxx.csv /folder/yyy.csv 赋值文件xxx.csv到 /folder/yyy.csv


7，mv 移动文件 

例：mv xxx.csv folder/yyy.csv #将文件移动到新目录并更改文件名



8，rm  删除文件  

例: rm -rf folder #删除folder中全部文件


9， echo 打印内容，可以写入或追加到文件

例1： echo "hello world" > test.txt 将一行字符串写入到文件

例2： echo "hello China" >> test.txt 将一行字符串追加到文件



10，du  查看文件大小 

例：du -sh folder #查看folder目录全部文件大小 -s 表示求和  -h 表示 human



11，wc 统计文件行数, 单词数，字节数

wc为 watch的缩写

例：wc -lwc xxx.txt #统计文件行数，单词数，字节数



12，chmod 修改文件或目录权限 

例：chmod 777 test.txt 让全部用户有读、写、和执行的权限


13，cat 拼接文件

后面可以接一个或者多个文件

例：cat abc.csv xyz.csv > data.csv 拼接两个文件abc.csv，xyz.csv中的内容并写入到data.csv中


14, find 查找文件位置

可以使用星号通配符 

例： find ~ -name stopword.txt  在主目录下查找名称为stopword.txt的文件路径


15,  head(tail) 查看文件前(后)n行

例1：head -n 100 xxx.csv #打印文件xxx.csv前100行

例2：tail -n 100 -f nohup.out #查看文件nohup.out的后100行并动态刷新


16， cut 截取文件某些列

可以指定分割方式 -d 为自定义分割方式， -b 按字节分割， -c 按字符分割 ，用-f指定取第几列

例：cut -d " " -f  2  test.txt  #对test.txt文件按空格分隔，取第二列


17， sort 文本排序

例：sort -t'-' -k 2 -n test.txt #指定分割符为"-"，按第二列排序，按数字大小排序


18， grep 文本搜索工具

grep (global search regular expression(RE) and print out the line) 全面搜索正则表达式并把行打印出来

例1: grep -ir "abc" ./  #在当前路径下递归查找具有"abc"字符串的文件，忽略"abc"大小写

例2：cat doc.md | grep "abc" #输出doc.md中含有"abc"字符串的行



19, sed 文本编辑工具

文本编辑工具，语法复杂，一些常见用法如下面例子 

例1：sed -i '1d' xxx.csv #删除文件中的第1行

例2：sed -n '50,100p' xxx.csv > yyy.csv #截取文件第50至100行

例3：cat xxx.csv | sed 's/ /\t/g' > yyy.csv  # 将文件中的空格替换为\t



20, awk 文本分析工具

文本分析工具，语法复杂，一些常见用法如下面的例子

例1： cat xxx.csv | awk -F'\t' '{print NF}' #查看文件每行有多少列，以'\t'分割

例2： cat xxx.csv | awk -F'\t' '{print $1, $2}' #获取文件第一和第二列，以'\t'分割

例3： cat xxx.csv | awk -F'\t' '{print $NF}' #获取文件最后一列，以'\t'分割


#### 三，文件压缩


21, zip压缩 

例1：zip -r ./xxx.zip ./  #压缩当前文件夹成 xxx.zip

例2：unzip xxx.zip   解压xxx.zip

例3：zip -r -P yourPassword yourZipFileName.zip yourSourceFileDir #压缩加密码



22, tar压缩

例1：tar -czf xxx.tar.gz xxx/*  #压缩文件夹

例2：tar -xzvf xxx.tar.gz   #解压xxx.tar.gz文件



#### 四，文件传输

<!-- #region -->
23， scp 跨机器拷贝 

仅需要在一台机器上操作

例1：从其它机器copy到当前机器

scp user@10.12.16.65:/home/user/xxx.csv xxx.csv


例2：从当前机器copy到其他机器

scp xxx.csv user@10.12.16.65:/home/user/xxx.csv

<!-- #endregion -->

<!-- #region -->
24， nc 网络通信工具

需要在两台机器上操作，一般先在一台机器上监听，然后再在另外一台机器上发送


例1：240机器上接收43机器上发送

nc -l 2222>file #在240机器上操作

nc 10.11.4.240 2222 <file #在43机器上操作

例2： 传输当前目录：

nc -l 9995 | tar xfvz -

tar czf - | nc ip 9995 
<!-- #endregion -->

25，rz/sz 与本地机器互传文件

rz 接受文件：receive Zmodem

sz 发送文件到windows上： send Zmodem




#### 五，进程管理


26, ps 查看进程信息

ps：process status

例1：ps -u liangyun  #查看当前liangyun用户全部进程信息

例2：ps -alf   | grep python #查看当前所有和Python相关的进程



27, kill 杀死进程

例1： kill -9 12345 #杀死进程号为12345的进程

例2： kill -9 $(ps -ef | grep liangyun)  #杀死某个用户的所有进程

例3： ps -ef | grep liangyun03 | grep -v 'grep' | awk '{print $2}' |xargs kill -9 #杀死某个用户的所有进程

这条命令的语法说明如下：

ps -ef : 打印出正在运行的进程信息

grep liangyun ： 查找进程信息带有liangyun03关键字的进程

grep -v 'grep' : 去掉grep自身进程的信息

awk '{print $2}' : 取得进程号

xargs kill -9 : 杀死进程


28, top 查看进程占用资源情况

例1：top #循环滚动显示当前活跃的进程占用资源情况，按Ctrl+C退出



29, &后台执行符号

&符号放在命令末尾表示在新的进程中运行命令

例： python test.py & 在一个新的进程中运行test.py脚本



30 nohup 不挂断执行命令

nohup 放在命令开始表示即使用户退出登录，这个命令依旧继续执行不挂断

例：nohup python tunexgboost.py & #在后台不挂断执行命令，日志输出写入nohup.out文件，可以用tail -f nohup.out监视日志



####  六，资源管理


31, df 查看磁盘使用情况

例： df -m -h #查看系统磁盘使用情况


32, free 查看CPU使用情况

例： free -m -h #查看CPU使用情况


33, ifconfig 查看机器ip


34, nvidia-smi 查看GPU使用情况


35, uname 查看操作系统信息

可看到操作系统名称和版本号

例：uname -a #查看全部系统信息


<!-- #region -->
#### 七，Linux管道和输入输出流


36， |符号 管道连接符

|可以连接两个命令，将前一个命令的输出作为后一个命令的输入

例1： ls | grep ".md" #找到当前目录下名字中含有".md"字符的文件

例2： cat input.txt | python mapper.py |sort -t 1| python reducer.py >output.txt   #用Linux管道模拟测试mapreduce程序
<!-- #endregion -->

37， <和>和>>符号 输入和输出流重定向

利用<符号可以将文件内容作为命令的输入，利用>和>>可以将输出流不打印到屏幕而是写入或追加到文件中。

例1：python test.py <input.txt  1>output.txt  2>error.txt  # input.txt作为test.py的输入，标准输出到output，错误输出到error


38，tee 读取标准输入并保存成文件

例1：ls | tee output..txt  #获取标准输入流，结果打印到屏幕并输出到output.txt文件中


#### Appendix A， vim基础用法



39，vim 文本编辑器

例1: vim helloworld.py 创建/打开文件

例2：按i/a 进入编辑模式

例3：按Esc退出编辑模式，进入命令模式

例4：输入 :wq 保存退出

例5：输入 :q! 强制退出 不保存

例6：输入:set number 显示行号，可以新建 ~/.vimrc 写入该命令永久有效

例7：输入:/re 查找匹配 re的字符串高亮显示，再输入:noh取消高亮, 输入/再按Enter查找下一处匹配

例8：输入:vsp xxx.py  横向视窗分割（visual split)并打开 xxx.py文件, Ctrl+W在不同窗口间切换

例9：vimdiff aa.txt  bb.txt  逐行比较两个文件

例10: 按Esc+g回到第一行，按Esc+Shift+g跳转到最后一行

例11：按shift+4移动到行尾，shift+6移动到行首

例12：多行注释方法， Ctrl + V 进入Block Visualization, 上下键选中多行，输入大写I，输入#，然后按两下Esc

例13：多行删除方法， Shift +V 进入 Line Visualization, 上下键选中多行，然后按Delete键删除


```bash

```

#### Appendix B，Linux配置文件


40，source 依次执行文件中命令

该命令也可以用.符号来代替

例1：source .bashrc #使得.bashrc中的修改立即生效 

以下为linux下常用配置文件

(1)，/etc/profile
用来设置系统环境参数，比如$PATH. 这里面的环境变量是对系统内所有用户生效的。

(2)，/etc/bashrc
这个文件设置系统bash shell相关的东西，对系统内所有用户生效。只要用户运行bash命令，那么这里面的东西就在起作用。

(3)，~/.bash_profile
用来设置一些环境变量，功能和/etc/profile 类似，但是这个是针对用户来设定的，也就是说，你在/home/user1/.bash_profile 中设定了环境变量，那么这个环境变量只针对 user1 这个用户生效.

(4)，~/.bashrc
作用类似于/etc/bashrc, 只是针对用户自己而言，不对其他用户生效。
另外/etc/profile中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是”父子”关系.

(5)，/etc/hosts 域名配置文件

注：
~/.bash_profile 是交互式、login 方式进入 bash 运行的，意思是只有用户登录时才会生效。
~/.bashrc 是交互式 non-login 方式进入 bash 运行的，用户不一定登录，只要以该用户身份运行命令行就会读取该文件。  


