# Matplotlib支持中文显示的两种方法


在默认情况下，Matplotlib在设置title和标注text时如果使用中文，会出现尴尬的框框。

使用以下两种方法可以轻松化解尴尬，让您在使用Matplotlib绘图时展露愉悦笑容。

1，使用FontManager函数指定中文字体文件

2，将中文字体文件放入matplotlib安装目录下

在公众号算法美食屋后台回复关键字：**中文字体**，可以获取SimHei中文字体。

![](./data/算法美食屋二维码.png)



### 一，使用FontManager函数指定中文字体文件

这种方法步骤较少，但是需要在每一个使用中文的地方指定font参数。



step1:下载中文字体文件
    
在公众号算法美食屋后台回复关键字：**中文字体**，可以获取SimHei中文字体。


step2:在代码中用FontManager函数指定中文字体文件路径。

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties  

# 加载中文字体
font = FontProperties(fname="./data/SimHei.ttf", size=14)  

# 数据准备
labels=["英语","数学","语文","化学","物理","体育","美术"]
stats=[90, 80, 76, 70, 75, 88,100]

# 画图数据准备，角度、状态值
angles=np.linspace(0, 2*np.pi, len(labels), endpoint=False)
stats=np.concatenate((stats,[stats[0]]))
angles=np.concatenate((angles,[angles[0]]))

# 画蜘蛛图
fig = plt.figure(figsize = (10,6))
ax = fig.add_subplot(111, polar=True)   
ax.plot(angles, stats, 'o-', linewidth=2)
ax.fill(angles, stats, alpha=0.25)

# 设置中文标题和维度名称
ax.set_thetagrids(angles * 180/np.pi,labels = labels+[labels[0]],font = font)
ax.set_title("小明各科成绩", font = font, size = 20)
plt.show()
```
```python
angles 
```

### 二，将中文字体文件放入matplotlib安装目录下


```python
labels 
```

这种方法步骤较多，但是只要初始设置了中文字体后，此后用到地方无需再特别指定字体参数。



step1:下载中文字体文件 SimHei.ttf
    
在公众号算法美食屋后台回复关键字：**中文字体**，可以获取SimHei中文字体。


step2:找到matplotlib的安装路径

```python
!pip show matplotlib 
```

```
Name: matplotlib
Version: 3.2.1
Summary: Python plotting package
Home-page: https://matplotlib.org
Author: John D. Hunter, Michael Droettboom
Author-email: matplotlib-users@python.org
License: PSF
Location: /Users/liangyun/anaconda3/lib/python3.7/site-packages
Requires: pyparsing, cycler, python-dateutil, kiwisolver, numpy
Required-by: seaborn, scikit-image, pycocotools, pandas-alive, gopup, akshare, bar-chart-race
```


于是matplotlib的安装路径是 /Users/liangyun/anaconda3/lib/python3.7/site-packages


step3:将字体文件放入到matplotlib安装目录下的字体文件夹下

```python
!mv SimHei.ttf /Users/liangyun/anaconda3/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf/
```

step4：找到maplotlib的缓存位置

```python
import matplotlib as mpl 
mpl.get_cachedir()
```

于是找到maptlotlib的缓存位置是 /Users/liangyun/.matplotlib


step5：清空缓存

```python
!rm -rf /Users/liangyun/.matplotlib
```

step6: 代码开始处设置字体


```python
import matplotlib.pyplot as plt
import seaborn as sns

plt.rcParams['font.family'] = ['sans-serif']
plt.rcParams['font.size'] = '20'
plt.rcParams['font.sans-serif'] = ['SimHei']


labels=np.array(["英语","数学","语文","化学","物理","体育"])
names = ["李雷","韩梅梅","汤姆","安"]
scores=np.array([[90, 80, 76, 70, 75, 88],[70, 60, 73, 80, 95, 55],
                 [70, 60, 56, 30, 65, 95],[50, 40, 66, 75, 74, 98]])

fig = plt.figure(0,figsize = (10,6))
plt.matshow(scores,fignum = 0)

plt.xticks(ticks = range(len(labels)),labels = labels)
plt.yticks(ticks = range(len(names)),labels = names)

# 绘制⽂本
for i in range(len(names)):
    for j in range(len(labels)):
        plt.text(j, i, round(scores[i, j],1), ha="center", va="center", color='r')
plt.colorbar()
plt.show()

```

```python

```


