# 使用TensorFlow、Pytorch深度学习进行项目实战

<!-- #region -->
深度学习工程师有时候也被称作"炼丹师"。为什么呢？因为他们的工作和"炼丹"非常相似。

古时候的炼丹师的日常主要工作是准备药材，架起炼丹炉，点火炼丹，开炉验丹。

而深度学习工程师的日常主要工作是准备数据，架起模型，训练模型，验证模型。

药材品质对于仙丹成败，就好像数据质量对于模型效果，是最最重要的。

炼丹炉的品质就好像模型的结构和目标函数的选择，是第二重要的。

炼丹过程火候的掌控就好像训练模型的优化算法的选择，是第三重要的。

目前深度学习界的炼丹师使用的炼丹炉主要生产自两个品牌厂商，一个叫做TensorFlow， 另一个叫做Pytorch.

TensorFlow这个品牌的炼丹炉历史悠久，2015年就横空出世，使用它的炼丹师最多。这个品牌的炼丹炉的优点是功能强大，类似炼丹全家桶这种东西，缺点是稍有些复杂，不少炼丹师抱怨这个炼丹炉出问题时调试起来很崩溃，目前出了TensorFlow2版本后这个问题好了许多。

Pytorch这个炼丹炉品牌历史较短，2017年才营业开张。不同于TensorFlow这个品牌追求炼丹全家桶，Pytorch的特点是小而美，没有放进太多非核心的功能，有需要的时候炼丹师可以利用其它工具DIY。由于其小而美的小透明风格，学术圈的大部分炼丹师都热衷于使用它来花式炼丹，并发表了大量的Paper。


下面我们将通过一个二分类问题的小范例，演示使用TensorFlow2和Pytorch进行炼丹的一般流程，让同学们感受一下炼丹的乐趣。

对于初次接触深度学习项目的同学，项目中的许多细节可能不太能看懂。

不必慌张，把握炼丹的整体流程是最关键的，相关的技术细节可以在需要的时候花时间各个击破。

<!-- #endregion -->

### 一，TensorFlow2 还是 Pytorch?


先说结论:

如果是工程师，应该优先选TensorFlow2.

如果是学生或者研究人员，应该优先选择Pytorch.

如果时间足够，最好TensorFlow2和Pytorch都要学习掌握。

理由如下：

1，在工业界最重要的是模型落地，目前国内的大部分互联网企业只支持TensorFlow模型的在线部署，不支持Pytorch。 并且工业界更加注重的是模型的高可用性，许多时候使用的都是成熟的模型架构，调试需求并不大。

2，研究人员最重要的是快速迭代发表文章，需要尝试一些较新的模型架构。而Pytorch在易用性上相比TensorFlow2有一些优势，更加方便调试。 并且在2019年以来在学术界占领了大半壁江山，能够找到的相应最新研究成果更多。

3，TensorFlow2和Pytorch实际上整体风格已经非常相似了，学会了其中一个，学习另外一个将比较容易。两种框架都掌握的话，能够参考的开源模型案例更多，并且可以方便地在两种框架之间切换。



```python

```

### 二，深度学习建模的一般流程


无论使用任何框架，深度学习构建神经网络模型的一般流程包括：

1，准备数据

2，定义模型

3，训练模型

4，评估模型

5，使用模型

6，保存模型。

下面我们将通过一个简单的二分类问题为例，对比演示使用TensorFlow2 和 Pytorch建立模型的一般流程。

```python

```

### 三，TensorFlow建模流程范例


TensorFlow一般使用DataSet构建数据管道，然后通过tf.keras构建模型，编译模型后调用fit方法将数据喂入模型开始训练。

```python

```

**1，准备数据**

```python
import numpy as np 
import pandas as pd 
from matplotlib import pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers,losses,metrics,optimizers
%matplotlib inline
%config InlineBackend.figure_format = 'svg'

#正负样本数量
n_positive,n_negative = 2000,2000

#生成正样本, 小圆环分布
r_p = 5.0 + tf.random.truncated_normal([n_positive,1],0.0,1.0)
theta_p = tf.random.uniform([n_positive,1],0.0,2*np.pi) 
Xp = tf.concat([r_p*tf.cos(theta_p),r_p*tf.sin(theta_p)],axis = 1)
Yp = tf.ones_like(r_p)

#生成负样本, 大圆环分布
r_n = 8.0 + tf.random.truncated_normal([n_negative,1],0.0,1.0)
theta_n = tf.random.uniform([n_negative,1],0.0,2*np.pi) 
Xn = tf.concat([r_n*tf.cos(theta_n),r_n*tf.sin(theta_n)],axis = 1)
Yn = tf.zeros_like(r_n)

#汇总样本
X = tf.concat([Xp,Xn],axis = 0)
Y = tf.concat([Yp,Yn],axis = 0)

#样本洗牌
data = tf.concat([X,Y],axis = 1)
data = tf.random.shuffle(data)
X = data[:,:2]
Y = data[:,2:]


#可视化
plt.figure(figsize = (6,6))
plt.scatter(Xp[:,0].numpy(),Xp[:,1].numpy(),c = "r")
plt.scatter(Xn[:,0].numpy(),Xn[:,1].numpy(),c = "g")
plt.legend(["positive","negative"]);
```

![](./data/tf输入数据.png)

```python

```

```python
# TensorFlow一般使用Dataset来构建数据管道

n = n_positive + n_negative 
ds_train = tf.data.Dataset.from_tensor_slices((X[0:n*3//4,:],Y[0:n*3//4,:])) \
     .shuffle(buffer_size = 1000).batch(20) \
     .prefetch(tf.data.experimental.AUTOTUNE) \
     .cache()

ds_valid = tf.data.Dataset.from_tensor_slices((X[n*3//4:,:],Y[n*3//4:,:])) \
     .batch(20) \
     .prefetch(tf.data.experimental.AUTOTUNE) \
     .cache()

```

```python

```

**2，定义模型**


TensorFlow一般有以下3种方式构建模型：使用Sequential按层顺序构建模型，使用函数式API构建任意结构模型，继承Model基类构建自定义模型。

此处选择使用函数式API构建模型。

```python
tf.keras.backend.clear_session()

x_input = layers.Input(shape = (2,))
x = layers.Dense(4,activation = "relu",name = "dense1")(x_input)
x = layers.Dense(8,activation = "relu",name = "dense2")(x)
y = layers.Dense(1,activation = "sigmoid",name = "dense3")(x)

model = tf.keras.Model(inputs = [x_input],outputs = [y] )
model.summary()
```

```
Model: "model"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
input_1 (InputLayer)         [(None, 2)]               0         
_________________________________________________________________
dense1 (Dense)               (None, 4)                 12        
_________________________________________________________________
dense2 (Dense)               (None, 8)                 40        
_________________________________________________________________
dense3 (Dense)               (None, 1)                 9         
=================================================================
Total params: 61
Trainable params: 61
Non-trainable params: 0
_________________________________________________________________
```

```python

```

**3，训练模型**

```python
model.compile(optimizer="adam",loss="binary_crossentropy",metrics=["accuracy"])
history = model.fit(ds_train,epochs= 50,validation_data= ds_valid)  
```

```
Epoch 45/50
150/150 [==============================] - 0s 2ms/step - loss: 0.1424 - accuracy: 0.9360 - val_loss: 0.1317 - val_accuracy: 0.9490
Epoch 46/50
150/150 [==============================] - 0s 2ms/step - loss: 0.1412 - accuracy: 0.9360 - val_loss: 0.1306 - val_accuracy: 0.9490
Epoch 47/50
150/150 [==============================] - 0s 2ms/step - loss: 0.1401 - accuracy: 0.9370 - val_loss: 0.1298 - val_accuracy: 0.9480
Epoch 48/50
150/150 [==============================] - 0s 3ms/step - loss: 0.1392 - accuracy: 0.9373 - val_loss: 0.1288 - val_accuracy: 0.9480
Epoch 49/50
150/150 [==============================] - 0s 3ms/step - loss: 0.1383 - accuracy: 0.9373 - val_loss: 0.1279 - val_accuracy: 0.9480
Epoch 50/50
150/150 [==============================] - 0s 3ms/step - loss: 0.1375 - accuracy: 0.9380 - val_loss: 0.1271 - val_accuracy: 0.9480
```





**4，评估模型**

```python
# 结果可视化
fig, (ax1,ax2) = plt.subplots(nrows=1,ncols=2,figsize = (12,5))
ax1.scatter(Xp[:,0].numpy(),Xp[:,1].numpy(),c = "r")
ax1.scatter(Xn[:,0].numpy(),Xn[:,1].numpy(),c = "g")
ax1.legend(["positive","negative"]);
ax1.set_title("y_true");

Xp_pred = tf.boolean_mask(X,tf.squeeze(model(X)>=0.5),axis = 0)
Xn_pred = tf.boolean_mask(X,tf.squeeze(model(X)<0.5),axis = 0)

ax2.scatter(Xp_pred[:,0].numpy(),Xp_pred[:,1].numpy(),c = "r")
ax2.scatter(Xn_pred[:,0].numpy(),Xn_pred[:,1].numpy(),c = "g")
ax2.legend(["positive","negative"]);
ax2.set_title("y_pred");
```

![](./data/tf模型结果可视化.png)

```python

```

```python
%matplotlib inline
%config InlineBackend.figure_format = 'svg'

import matplotlib.pyplot as plt

def plot_metric(history, metric):
    train_metrics = history.history[metric]
    val_metrics = history.history['val_'+metric]
    epochs = range(1, len(train_metrics) + 1)
    plt.plot(epochs, train_metrics, 'bo--')
    plt.plot(epochs, val_metrics, 'ro-')
    plt.title('Training and validation '+ metric)
    plt.xlabel("Epochs")
    plt.ylabel(metric)
    plt.legend(["train_"+metric, 'val_'+metric])
    plt.show()
```

```python
plot_metric(history,"loss")
```

![](./data/tf损失曲线.png)

```python
plot_metric(history,"accuracy")
```

![](./data/tf准确率曲线.png)

```python

```

可以用model.evaluate评估模型.

```python
(loss,accuracy) = model.evaluate(ds_valid)
print(loss,accuracy)
```

```
50/50 [==============================] - 0s 1ms/step - loss: 0.1114 - accuracy: 0.9510
0.11143173044547439 0.951
```

```python

```

**5，使用模型**


一般使用model.predict方法进行预测。

```python
model.predict(ds_valid)[0:10]
```

```
array([[9.8861283e-01],
       [2.2271587e-02],
       [2.0001957e-04],
       [2.8627261e-03],
       [7.2502601e-01],
       [9.9810719e-01],
       [9.7249800e-01],
       [1.6852912e-01],
       [3.1919468e-02],
       [2.7522160e-02]], dtype=float32)
```

```python

```

**6，保存模型**


可以用save方法保存模型。

```python
# 保存模型结构与模型参数到文件,该方式保存的模型具有跨平台性便于部署

model.save('./data/tf_model_savedmodel', save_format="tf")
print('export saved model.')

model_loaded = tf.keras.models.load_model('./data/tf_model_savedmodel')
loss,accuracy = model_loaded.evaluate(ds_valid)
print(loss,accuracy)
```

```
INFO:tensorflow:Assets written to: ./data/tf_model_savedmodel/assets
export saved model.
50/50 [==============================] - 0s 4ms/step - loss: 0.1114 - accuracy: 0.9510
0.11143159026280046 0.951
```

```python

```

### 四，Pytorch建模流程范例


Pytorch一般使用DataLoader加载数据管道，然后继承nn.Module构建模型，然后编写自定义训练循环。

```python
import os
#mac系统上pytorch和matplotlib在jupyter中同时跑需要更改环境变量
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE" 

```

**1，准备数据**

```python
import numpy as np 
import pandas as pd 
from matplotlib import pyplot as plt
import torch
from torch import nn
import torch.nn.functional as F
from torch.utils.data import Dataset,DataLoader,TensorDataset
%matplotlib inline
%config InlineBackend.figure_format = 'svg'

#正负样本数量
n_positive,n_negative = 2000,2000

#生成正样本, 小圆环分布
r_p = 5.0 + torch.normal(0.0,1.0,size = [n_positive,1]) 
theta_p = 2*np.pi*torch.rand([n_positive,1])
Xp = torch.cat([r_p*torch.cos(theta_p),r_p*torch.sin(theta_p)],axis = 1)
Yp = torch.ones_like(r_p)

#生成负样本, 大圆环分布
r_n = 8.0 + torch.normal(0.0,1.0,size = [n_negative,1]) 
theta_n = 2*np.pi*torch.rand([n_negative,1])
Xn = torch.cat([r_n*torch.cos(theta_n),r_n*torch.sin(theta_n)],axis = 1)
Yn = torch.zeros_like(r_n)

#汇总样本
X = torch.cat([Xp,Xn],axis = 0)
Y = torch.cat([Yp,Yn],axis = 0)


#可视化
plt.figure(figsize = (6,6))
plt.scatter(Xp[:,0],Xp[:,1],c = "r")
plt.scatter(Xn[:,0],Xn[:,1],c = "g")
plt.legend(["positive","negative"]);
```

![](./data/torch训练数据可视化.png)

```python
#构建输入数据管道

from sklearn.model_selection import train_test_split

X_train,X_valid,Y_train,Y_valid = train_test_split(X.numpy(),Y.numpy(),test_size = 0.3)

ds_train= TensorDataset(torch.from_numpy(X_train),torch.from_numpy(Y_train))
ds_valid = TensorDataset(torch.from_numpy(X_valid),torch.from_numpy(Y_valid))

dl_train = DataLoader(ds_train,batch_size = 10,shuffle=True,num_workers=2)
dl_valid = DataLoader(ds_valid,batch_size = 10,num_workers=2)

```

```python

```

**2，定义模型**

```python
from torchsummary import summary
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(2,4)
        self.fc2 = nn.Linear(4,8) 
        self.fc3 = nn.Linear(8,1)

    # 正向传播
    def forward(self,x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        y = nn.Sigmoid()(self.fc3(x))
        return y
    
net = Net()
summary(net,input_size= (2,))
```

```
----------------------------------------------------------------
        Layer (type)               Output Shape         Param #
================================================================
            Linear-1                    [-1, 4]              12
            Linear-2                    [-1, 8]              40
            Linear-3                    [-1, 1]               9
================================================================
Total params: 61
Trainable params: 61
Non-trainable params: 0
----------------------------------------------------------------
Input size (MB): 0.00
Forward/backward pass size (MB): 0.00
Params size (MB): 0.00
Estimated Total Size (MB): 0.00
----------------------------------------------------------------
```

```python

```

**3，训练模型**


Pytorch通常需要用户编写自定义训练循环，训练循环的代码风格因人而异。

有3类典型的训练循环代码风格：脚本形式训练循环，函数形式训练循环，类形式训练循环。

此处介绍一种较通用的脚本形式。

```python
from sklearn.metrics import accuracy_score
import datetime

loss_func = nn.BCELoss()
optimizer = torch.optim.Adam(params=net.parameters(),lr = 0.001)
metric_func = lambda y_pred,y_true: accuracy_score(y_true.data.numpy(),y_pred.data.numpy()>0.5)
metric_name = "accuracy"

```

```python
epochs = 20
log_step_freq = 100

dfhistory = pd.DataFrame(columns = ["epoch","loss",metric_name,"val_loss","val_"+metric_name]) 
print("Start Training...")
nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
print("=========="*8 + "%s"%nowtime)

for epoch in range(1,epochs+1):  

    # 1，训练循环-------------------------------------------------
    net.train()
    loss_sum = 0.0
    metric_sum = 0.0
    step = 1
    
    for step, (features,labels) in enumerate(dl_train, 1):
    
        # 梯度清零
        optimizer.zero_grad()

        # 正向传播求损失
        predictions = net(features)
        loss = loss_func(predictions,labels)
        metric = metric_func(predictions,labels)
        
        # 反向传播求梯度
        loss.backward()
        optimizer.step()

        # 打印batch级别日志
        loss_sum += loss.item()
        metric_sum += metric.item()
        if step%log_step_freq == 0:   
            print(("[step = %d] loss: %.3f, "+metric_name+": %.3f") %
                  (step, loss_sum/step, metric_sum/step))
            
    # 2，验证循环-------------------------------------------------
    net.eval()
    val_loss_sum = 0.0
    val_metric_sum = 0.0
    val_step = 1

    for val_step, (features,labels) in enumerate(dl_valid, 1):
        
        predictions = net(features)
        val_loss = loss_func(predictions,labels)
        val_metric = metric_func(predictions,labels)

        val_loss_sum += val_loss.item()
        val_metric_sum += val_metric.item()

    # 3，记录日志-------------------------------------------------
    info = (epoch, loss_sum/step, metric_sum/step, 
            val_loss_sum/val_step, val_metric_sum/val_step)
    dfhistory.loc[epoch-1] = info
    
    # 打印epoch级别日志
    print(("\nEPOCH = %d, loss = %.3f,"+ metric_name + \
          "  = %.3f, val_loss = %.3f, "+"val_"+ metric_name+" = %.3f") 
          %info)
    nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("\n"+"=========="*8 + "%s"%nowtime)
        
print('Finished Training...')

```

```
Start Training...
================================================================================2020-05-03 00:07:07
[step = 100] loss: 0.783, accuracy: 0.511
[step = 200] loss: 0.740, accuracy: 0.507

EPOCH = 1, loss = 0.723,accuracy  = 0.513, val_loss = 0.684, val_accuracy = 0.514

================================================================================2020-05-03 00:07:08
[step = 100] loss: 0.679, accuracy: 0.518
[step = 200] loss: 0.675, accuracy: 0.521

EPOCH = 2, loss = 0.672,accuracy  = 0.530, val_loss = 0.674, val_accuracy = 0.528

================================================================================2020-05-03 00:07:09
[step = 100] loss: 0.660, accuracy: 0.553
[step = 200] loss: 0.661, accuracy: 0.549

EPOCH = 3, loss = 0.660,accuracy  = 0.551, val_loss = 0.663, val_accuracy = 0.546

================================================================================2020-05-03 00:07:10
[step = 100] loss: 0.642, accuracy: 0.578
[step = 200] loss: 0.648, accuracy: 0.580

EPOCH = 4, loss = 0.647,accuracy  = 0.580, val_loss = 0.651, val_accuracy = 0.578

================================================================================2020-05-03 00:07:11
[step = 100] loss: 0.634, accuracy: 0.600
[step = 200] loss: 0.630, accuracy: 0.611

EPOCH = 5, loss = 0.630,accuracy  = 0.612, val_loss = 0.632, val_accuracy = 0.640

================================================================================2020-05-03 00:07:12
[step = 100] loss: 0.619, accuracy: 0.692
[step = 200] loss: 0.615, accuracy: 0.660

EPOCH = 6, loss = 0.608,accuracy  = 0.670, val_loss = 0.607, val_accuracy = 0.674

================================================================================2020-05-03 00:07:13
[step = 100] loss: 0.595, accuracy: 0.704
[step = 200] loss: 0.581, accuracy: 0.715

EPOCH = 7, loss = 0.577,accuracy  = 0.717, val_loss = 0.573, val_accuracy = 0.716

================================================================================2020-05-03 00:07:14
[step = 100] loss: 0.546, accuracy: 0.748
[step = 200] loss: 0.539, accuracy: 0.744

EPOCH = 8, loss = 0.533,accuracy  = 0.753, val_loss = 0.513, val_accuracy = 0.783

================================================================================2020-05-03 00:07:15
[step = 100] loss: 0.486, accuracy: 0.794
[step = 200] loss: 0.477, accuracy: 0.799

EPOCH = 9, loss = 0.470,accuracy  = 0.799, val_loss = 0.462, val_accuracy = 0.786

================================================================================2020-05-03 00:07:16
[step = 100] loss: 0.410, accuracy: 0.834
[step = 200] loss: 0.427, accuracy: 0.811

EPOCH = 10, loss = 0.420,accuracy  = 0.816, val_loss = 0.417, val_accuracy = 0.803

================================================================================2020-05-03 00:07:17
[step = 100] loss: 0.392, accuracy: 0.828
[step = 200] loss: 0.378, accuracy: 0.829

EPOCH = 11, loss = 0.376,accuracy  = 0.831, val_loss = 0.374, val_accuracy = 0.833

================================================================================2020-05-03 00:07:18
[step = 100] loss: 0.339, accuracy: 0.849
[step = 200] loss: 0.346, accuracy: 0.843

EPOCH = 12, loss = 0.340,accuracy  = 0.846, val_loss = 0.345, val_accuracy = 0.827

================================================================================2020-05-03 00:07:19
[step = 100] loss: 0.307, accuracy: 0.865
[step = 200] loss: 0.315, accuracy: 0.849

EPOCH = 13, loss = 0.312,accuracy  = 0.850, val_loss = 0.313, val_accuracy = 0.848

================================================================================2020-05-03 00:07:20
[step = 100] loss: 0.298, accuracy: 0.856
[step = 200] loss: 0.290, accuracy: 0.862

EPOCH = 14, loss = 0.288,accuracy  = 0.861, val_loss = 0.299, val_accuracy = 0.845

================================================================================2020-05-03 00:07:21
[step = 100] loss: 0.272, accuracy: 0.869
[step = 200] loss: 0.271, accuracy: 0.869

EPOCH = 15, loss = 0.271,accuracy  = 0.866, val_loss = 0.282, val_accuracy = 0.855

================================================================================2020-05-03 00:07:22
[step = 100] loss: 0.274, accuracy: 0.872
[step = 200] loss: 0.262, accuracy: 0.876

EPOCH = 16, loss = 0.258,accuracy  = 0.879, val_loss = 0.267, val_accuracy = 0.868

================================================================================2020-05-03 00:07:22
[step = 100] loss: 0.241, accuracy: 0.904
[step = 200] loss: 0.244, accuracy: 0.907

EPOCH = 17, loss = 0.246,accuracy  = 0.910, val_loss = 0.264, val_accuracy = 0.910

================================================================================2020-05-03 00:07:23
[step = 100] loss: 0.237, accuracy: 0.916
[step = 200] loss: 0.239, accuracy: 0.917

EPOCH = 18, loss = 0.239,accuracy  = 0.918, val_loss = 0.255, val_accuracy = 0.913

================================================================================2020-05-03 00:07:24
[step = 100] loss: 0.245, accuracy: 0.909
[step = 200] loss: 0.240, accuracy: 0.918

EPOCH = 19, loss = 0.234,accuracy  = 0.919, val_loss = 0.244, val_accuracy = 0.908

================================================================================2020-05-03 00:07:25
[step = 100] loss: 0.246, accuracy: 0.904
[step = 200] loss: 0.232, accuracy: 0.912

EPOCH = 20, loss = 0.226,accuracy  = 0.917, val_loss = 0.234, val_accuracy = 0.922

================================================================================2020-05-03 00:07:26
Finished Training...
```

```python

```

**4，验证模型**

```python
# 结果可视化
fig, (ax1,ax2) = plt.subplots(nrows=1,ncols=2,figsize = (12,5))
ax1.scatter(Xp[:,0],Xp[:,1], c="r")
ax1.scatter(Xn[:,0],Xn[:,1],c = "g")
ax1.legend(["positive","negative"]);
ax1.set_title("y_true");

Xp_pred = X[torch.squeeze(net.forward(X)>=0.5)]
Xn_pred = X[torch.squeeze(net.forward(X)<0.5)]

ax2.scatter(Xp_pred[:,0],Xp_pred[:,1],c = "r")
ax2.scatter(Xn_pred[:,0],Xn_pred[:,1],c = "g")
ax2.legend(["positive","negative"]);
ax2.set_title("y_pred")
plt.show()
```

![](./data/torch可视化.png)

```python
%matplotlib inline
%config InlineBackend.figure_format = 'svg'

import matplotlib.pyplot as plt

def plot_metric(dfhistory, metric):
    train_metrics = dfhistory[metric]
    val_metrics = dfhistory['val_'+metric]
    epochs = range(1, len(train_metrics) + 1)
    plt.plot(epochs, train_metrics, 'bo--')
    plt.plot(epochs, val_metrics, 'ro-')
    plt.title('Training and validation '+ metric)
    plt.xlabel("Epochs")
    plt.ylabel(metric)
    plt.legend(["train_"+metric, 'val_'+metric])
    plt.show()
    
```

```python
plot_metric(dfhistory,"loss")
```

![](./data/torch的损失曲线.png)

```python
plot_metric(dfhistory,"accuracy")
```

![](./data/torch准确率曲线.png)

```python

```

**5，使用模型**


```python
def predict(model,dl):
    model.eval()
    result = torch.cat([model.forward(t[0]) for t in dl])
    return(result.data)
```

```python
#预测概率
y_pred_probs = predict(net,dl_valid)
y_pred_probs
```

```
tensor([[0.9995],
        [0.9979],
        [0.3963],
        ...,
        [0.9828],
        [0.9479],
        [0.3365]])
```

```python
#预测类别
y_pred = torch.where(y_pred_probs>0.5,
        torch.ones_like(y_pred_probs),torch.zeros_like(y_pred_probs))
y_pred
```

```
tensor([[0.],
        [1.],
        [0.],
        ...,
        [0.],
        [1.],
        [0.]])
```

```python

```

**6, 保存模型**


推荐使用保存参数方式保存Pytorch模型。

```python
print(net.state_dict().keys())
```

```
odict_keys(['fc1.weight', 'fc1.bias', 'fc2.weight', 'fc2.bias', 'fc3.weight', 'fc3.bias'])
```

```python
# 保存模型参数

torch.save(net.state_dict(), "./data/net_parameter.pkl")

net_clone = Net()
net_clone.load_state_dict(torch.load("./data/net_parameter.pkl"))

predict(net_clone,dl_valid)
```

```
tensor([[0.4916],
        [0.9088],
        [0.0243],
        ...,
        [0.2110],
        [0.8611],
        [0.4693]])
```
