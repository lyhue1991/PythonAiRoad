# 使用pytorch-lightning漂亮地进行深度学习研究


pytorch-lightning 是建立在pytorch之上的高层次模型接口。

pytorch-lightning 之于 pytorch，就如同keras之于 tensorflow.

通过使用 pytorch-lightning，用户无需编写自定义训练循环就可以非常简洁地在CPU、单GPU、多GPU、乃至多TPU上训练模型。

无需考虑模型和数据在cpu,cuda之间的移动，并且可以通过回调函数实现CheckPoint参数保存，实现断点续训功能。

<!-- #region -->
一般按照如下方式 安装和 引入 pytorch-lightning 库。

```bash
#安装
pip install pytorch-lightning
```

```python 
#引入
import pytorch_lightning as pl 
```

顾名思义，它可以帮助我们漂亮(pl)地进行深度学习研究。😋😋 


<!-- #endregion -->

```python

```

## 一，pytorch-lightning的设计哲学


pytorch-lightning 的核心设计哲学是将 深度学习项目中的 研究代码(定义模型) 和 工程代码 (训练模型) 相互分离。

用户只需专注于研究代码(pl.LightningModule)的实现，而工程代码借助训练工具类(pl.Trainer)统一实现。

更详细地说，深度学习项目代码可以分成如下4部分：

* 研究代码 (Research code)，用户继承LightningModule实现。
* 工程代码 (Engineering code)，用户无需关注通过调用Trainer实现。
* 非必要代码 （Non-essential research code，logging, etc...），用户通过调用Callbacks实现。
* 数据 (Data)，用户通过torch.utils.data.DataLoader实现。



```python

```

## 二，pytorch-lightning使用范例


下面我们使用minist图片分类问题为例，演示pytorch-lightning的最佳实践。



**1，准备数据**

```python
import torch 
from torch import nn 

import torchvision 
from torchvision import transforms

```

```python
transform = transforms.Compose([transforms.ToTensor()])

ds_train = torchvision.datasets.MNIST(root="./minist/",train=True,download=True,transform=transform)
ds_valid = torchvision.datasets.MNIST(root="./minist/",train=False,download=True,transform=transform)

dl_train =  torch.utils.data.DataLoader(ds_train, batch_size=128, shuffle=True, num_workers=4)
dl_valid =  torch.utils.data.DataLoader(ds_valid, batch_size=128, shuffle=False, num_workers=4)

print(len(ds_train))
print(len(ds_valid))

```

```
Done!
60000
10000
```


**2，定义模型**

```python
import pytorch_lightning as pl 
import datetime

class Model(pl.LightningModule):
    
    def __init__(self):
        super().__init__()
        self.layers = nn.ModuleList([
            nn.Conv2d(in_channels=1,out_channels=32,kernel_size = 3),
            nn.MaxPool2d(kernel_size = 2,stride = 2),
            nn.Conv2d(in_channels=32,out_channels=64,kernel_size = 5),
            nn.MaxPool2d(kernel_size = 2,stride = 2),
            nn.Dropout2d(p = 0.1),
            nn.AdaptiveMaxPool2d((1,1)),
            nn.Flatten(),
            nn.Linear(64,32),
            nn.ReLU(),
            nn.Linear(32,10)]
        )
        
    def forward(self,x):
        for layer in self.layers:
            x = layer(x)
        return x
    
    #定义loss,以及可选的各种metrics
    def training_step(self, batch, batch_idx):
        x, y = batch
        prediction = self(x)
        loss = nn.CrossEntropyLoss()(prediction,y)
        return loss
    
    #定义optimizer,以及可选的lr_scheduler
    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=1e-3)
        return {"optimizer":optimizer}
    
    def validation_step(self, batch, batch_idx):
        loss = self.training_step(batch,batch_idx)
        return {"val_loss":loss}
    
    def test_step(self, batch, batch_idx):
        loss = self.training_step(batch,batch_idx)
        return {"test_loss":loss}
    
  
```

**3，训练模型**

```python
pl.seed_everything(1234)
model = Model() 


ckpt_callback = pl.callbacks.ModelCheckpoint(
    monitor='val_loss',
    save_top_k=1,
    mode='min'
)

# gpus=0 则使用cpu训练，gpus=1则使用1个gpu训练，gpus=2则使用2个gpu训练，gpus=-1则使用所有gpu训练，
# gpus=[0,1]则指定使用0号和1号gpu训练， gpus="0,1,2,3"则使用0,1,2,3号gpu训练
# tpus=1 则使用1个tpu训练

trainer = pl.Trainer(max_epochs=5,gpus=0,callbacks = [ckpt_callback]) 

#断点续训
#trainer = pl.Trainer(resume_from_checkpoint='./lightning_logs/version_31/checkpoints/epoch=02-val_loss=0.05.ckpt')

trainer.fit(model,dl_train,dl_valid)

```

```
Global seed set to 1234
GPU available: False, used: False
TPU available: None, using: 0 TPU cores

  | Name   | Type       | Params
--------------------------------------
0 | layers | ModuleList | 54.0 K
--------------------------------------
54.0 K    Trainable params
0         Non-trainable params
54.0 K    Total params
Epoch 4: 100% >>>>>>>>>>>>>>>>>>>>>>>>>>>> 158/158 [00:19<00:00, 8.08it/s, loss=0.138, v_num=34]
```

```python

```

**4，评估模型**

```python
result = trainer.test(model, test_dataloaders=dl_valid)
print(result)
```

```
--------------------------------------------------------------------------------
DATALOADER:0 TEST RESULTS
{'test_loss': tensor(0.0047)}
--------------------------------------------------------------------------------
[{'test_loss': 0.004680501762777567}]
```


**5，使用模型**

```python
data,label = next(iter(dl_valid))
model.eval()
prediction = model(data)
print(prediction)

```

```
tensor([[ -5.1149,  -6.1142,   2.0591,  ...,   7.0609,  -5.4144,   0.5222],
        [ -2.2989,  -5.6076,   3.7343,  ...,  -1.8391,  -6.4941,  -3.4076],
        [  0.9215,   6.9357,  -1.9887,  ...,  -2.2996,  -0.8034,  -3.2993],
        ...,
        [ -4.5674,  -6.0223,  -0.9309,  ...,  -3.5468,   0.3367,   4.5473],
        [  4.3023,  -4.1629,  -1.2742,  ...,  -4.2527,  -2.3449,  -2.5585],
        [ -3.8913, -10.3790,  -1.7804,  ...,  -4.6757,  -0.7428,   1.0305]],
       grad_fn=<AddmmBackward>)
```


**6，保存模型**


最优模型默认保存在 trainer.checkpoint_callback.best_model_path 的目录下，可以直接加载。

```python
print(trainer.checkpoint_callback.best_model_path)
print(trainer.checkpoint_callback.best_model_score)
```

```
/Users/liangyun/CodeFiles/PythonAiRoad/lightning_logs/version_34/checkpoints/epoch=04-val_loss=0.00.ckpt
tensor(0.0047)

```

```python
model_clone = Model.load_from_checkpoint(trainer.checkpoint_callback.best_model_path)
trainer_clone = pl.Trainer(max_epochs=3) 
result = trainer_clone.test(model_clone,dl_valid)
print(result)

```

```
--------------------------------------------------------------------------------
DATALOADER:0 TEST RESULTS
{'test_loss': tensor(0.0047)}
--------------------------------------------------------------------------------
[{'test_loss': 0.004680501762777567}]
```


如果对本文内容理解上有需要进一步和作者交流的地方，欢迎在公众号"算法美食屋"下留言。作者时间和精力有限，会酌情予以回复。

也可以在公众号后台回复关键字：加群，加入读者交流群和大家讨论。

![](./data/算法美食屋二维码.png)



