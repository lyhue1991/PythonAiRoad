---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.2'
      jupytext_version: 1.4.1
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
---

<!-- #region colab_type="text" id="_ICXkagLFajp" -->
# 一，分析代码运行时间
<!-- #endregion -->

<!-- #region colab={} colab_type="code" id="0Fu1N1oGFcAy" -->
## 1，测算代码单次运行时间
<!-- #endregion -->

```python
# 平凡方法
```

```python colab={} colab_type="code" id="e_Bq8hIxkekf"
import time
tic = time.time()
much_job = [x**2 for x in range(1,1000000,3)]
toc = time.time()
print('used {:.5}s'.format(toc-tic))
```

```python
# 快捷方法(jupyter)
```

```python colab={} colab_type="code" id="xR3PtPAhkeqk"
%%time
much_job = [x**2 for x in range(1,1000000,3)]
```

## 2,测算代码重复执行多次平均用时

```python
# 平凡方法
```

```python
from timeit import timeit
g = lambda x:x**2+1
def main():
    return(g(2)**120)

#timeit('main()',setup = 'from __main__ import main',number = 10)
timeit('main()',globals = {'main':main},number = 10)
```

```python
# 快捷方法(jupyter)
```

```python
%%timeit -n 10 
g = lambda x:x**2+1
def main():
    return(g(2)**120)
main()
```

<!-- #region colab={} colab_type="code" id="ecvv8ZeLFcLk" -->
## 3,按调用函数分析代码运行时间
<!-- #endregion -->

```python
# 平凡方法
```

```python
def relu(x):
    return(x if x>0 else 0)
def main():
    result = [relu(x) for x in range(-100000,100000,1)]   
    return result
```

```python
import profile
profile.run('main()')
```

```python colab={} colab_type="code" id="G3zCFPpFFcOB"
# 快捷方法(jupyter)
```

```python
%prun main()
```

## 4，按行分析代码运行时间

```python
# 平凡方法
```

```python colab={} colab_type="code" id="5QvQMQQWFcTM"
!pip install line_profiler
%load_ext line_profiler
```

```python
def relu(x):
    return(x if x>0 else 0)
def main():
    result = [relu(x) for x in range(-100000,100000)]   
    return result

```

```python
from line_profiler import LineProfiler
lprofile = LineProfiler(main,relu)
lprofile.run('main()')
lprofile.print_stats()
```

```python
#快捷方法(jupyter)
```

```python
%lprun -f main -f relu main()
```

<!-- #region colab_type="text" id="u8e-14scdvtl" -->
# 二，加速你的查找
<!-- #endregion -->

<!-- #region colab={} colab_type="code" id="N0_C7S_Fd3nr" -->
## 5,用set而非list进行in查找
<!-- #endregion -->

```python
#低速方法
```

```python colab={} colab_type="code" id="NqRXw5nBSHRF"
data =  (i**2 + 1 for i in range(1000000))
list_data = list(data)
set_data = set(data)
```

```python colab={"base_uri": "https://localhost:8080/", "height": 69} colab_type="code" id="dThLlzyThyzv" outputId="bb17e4af-5553-4834-9ac9-59b6c960050d"
%%time
1098987 in list_data
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 69} colab_type="code" id="PGMI6dl9LQGN" outputId="e0ad7c1c-bf6f-4873-f8d7-04ca0df4d772"
%%time 
1098987 in set_data 
```

<!-- #region colab={} colab_type="code" id="02bJNuoGhy4S" -->
## 6,用dict而非两个list进行匹配查找
<!-- #endregion -->

```python
# 低速方法
```

```python colab={} colab_type="code" id="QIhJ2jqnd3xB"
list_a = [2*i-1 for  i in range(1000000)]
list_b = [i**2 for i in list_a ]
dict_ab = dict(zip(list_a,list_b))
```

```python colab={"base_uri": "https://localhost:8080/", "height": 71} colab_type="code" id="-7FWEPlxZiqZ" outputId="de9b2950-d388-452c-f758-ab903cc0cbce"
%%time
print(list_b[list_a.index(876567)])
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 71} colab_type="code" id="JxqcLaYrZr6S" outputId="bbcdcc54-54ff-409c-d0e5-3d33a0976624"
%%time
print(dict_ab.get(876567,None))
```

<!-- #region colab_type="text" id="dHmwdAQwd3zx" -->
# 三，加速你的循环
<!-- #endregion -->

<!-- #region colab={} colab_type="code" id="AJsCEo8Ie0pl" -->
## 7,优先使用for循环而不是while循环
<!-- #endregion -->

```python
#低速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 71} colab_type="code" id="ZHcLeWvue1OF" outputId="a5916574-5f63-4abc-a635-faa7ce8717f6"
%%time
s,i = 0,0
while i<10000:
    i = i + 1
    s = s + i
print(s) 
```

```python
#高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 71} colab_type="code" id="kpiIc-O9fS4K" outputId="cb935467-79ce-4567-80cf-7781de932617"
%%time
s = 0
for i in range(1,10001):
    s = s + i 
print(s)
```

```python colab={} colab_type="code" id="eAO9DML7e1ZK"

```

<!-- #region colab={} colab_type="code" id="UPn78KYGd32B" -->
## 8,循环体中避免重复运算
<!-- #endregion -->

```python
# 低速方法
```

```python colab={} colab_type="code" id="g0_Gfulkem9s"
a = [i**2+1 for i in range(2000)]
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="nrdA3k9pVACJ" outputId="4304fccb-a1a0-4252-ef64-87da076bcace"
%%time
b = [i/sum(a) for i in a]
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="hx7ZTNuKT_D6" outputId="51bbffe9-d07e-486c-9d2d-781e2bc79388"
%%time
sum_a = sum(a)
b = [i/sum_a for i in a]
```

```python colab={} colab_type="code" id="9RDsEmwIdG_b"

```

<!-- #region colab_type="text" id="dkQHLnzMenLa" -->
# 四，加速你的函数
<!-- #endregion -->

## 9，用缓存机制加速递归函数

```python
# 低速方法
```

```python
%%time
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
print(fib(30))
```

```python
#高速方法
```

```python
%%time
from functools import lru_cache

@lru_cache(100)
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
print(fib(30))
```

```python
fib.cache_info()
```

<!-- #region colab={} colab_type="code" id="qJgCJH1PetLL" -->
## 10,用循环取代递归函数
<!-- #endregion -->

```python
# 低速方法
```

```python
%%time
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
print(fib(30))
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="Tv7zkwbK1Qci" outputId="4fbe18c7-9ede-4b7b-c4d6-bc84042a031e"
%%time
def fib(n):
    if n in (1,2):
        return(1)
    a,b = 1,1
    for i in range(2,n):
        a,b = b,a+b
    return(b)
print(fib(30))
```

## 11， 使用Numba加速Python函数

```python
# 低速方法
```

```python colab={} colab_type="code" id="1q_W5fjO2qEU"
%%time
def my_power(x):
    return(x**2)

def my_power_sum(n):
    s = 0
    for i in range(1,n+1):
        s = s  + my_power(i)
    return(s)

print(my_power_sum(1000000))
```

```python
# 高速方法
```

```python
%%time
from numba import jit

@jit
def my_power(x):
    return(x**2)
@jit
def my_power_sum(n):
    s = 0
    for i in range(1,n+1):
        s = s  + my_power(i)
    return(s)

print(my_power_sum(1000000))
```

<!-- #region colab_type="text" id="bIUuEmGbeuEh" -->
#  五，使用标准库函数进行加速
<!-- #endregion -->

<!-- #region colab={} colab_type="code" id="ljwOF4SBNBua" -->
## 12，使用collections.Counter类加速计数
<!-- #endregion -->

```python
# 低速方法
```

```python colab={} colab_type="code" id="Ta9S4Vrb108G"
data = [x**2%1989 for x in range(2000000)]
```

```python colab={"base_uri": "https://localhost:8080/", "height": 71} colab_type="code" id="v3oJzTZfepqb" outputId="7b30b8cc-c5c4-49db-da63-35635c8c26ea"
%%time
values_count = {}
for i in data:
    i_cnt = values_count.get(i,0)
    values_count[i] = i_cnt + 1
print(values_count.get(4,0))
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="d2y4dVts3Py3" outputId="7c33de3b-6868-460e-90bf-a6c0d2c1ee36"
%%time
from collections import Counter
values_count = Counter(data)
print(values_count.get(4,0))
```

<!-- #region colab={} colab_type="code" id="VXWlcglGNB1Z" -->
## 13, 使用collections.ChainMap加速字典合并
<!-- #endregion -->

```python
# 低速方法
```

```python colab={} colab_type="code" id="Z9C0ae5qNB4K"
dic_a = {i:i+1 for i in range(1,1000000,2)}
dic_b = {i:2*i+1 for i in range(1,1000000,3)}
dic_c = {i:3*i+1 for i in range(1,1000000,5)}
dic_d = {i:4*i+1 for i in range(1,1000000,7)}
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="gnUpMt4ogvU-" outputId="c5da1da9-150b-4dd1-b80a-dbd543589d85"
%%time
result = dic_a.copy()
result.update(dic_b)
result.update(dic_c)
result.update(dic_d)
print(result.get(9999,0))
```

```python
# 高速方法
```

```python colab={"base_uri": "https://localhost:8080/", "height": 53} colab_type="code" id="J9gsBFFQg0K3" outputId="561bbda1-9d85-4004-e159-ef9a2cffafac"
%%time
from collections import ChainMap
chain = ChainMap(dic_a,dic_b,dic_c,dic_d)
print(chain.get(9999,0))

```

```python colab={} colab_type="code" id="eouQJ4dEx7Li"

```

<!-- #region colab_type="text" id="m0P9bR84euGy" -->
#  六，使用numpy向量化进行加速
<!-- #endregion -->

<!-- #region colab={} colab_type="code" id="9rMqzet_ezNK" -->
## 14,使用np.array代替list
<!-- #endregion -->

```python
# 低速方法
```

```python colab={} colab_type="code" id="JI34O1RjezpM"
%%time
a = range(1,1000000,3)
b = range(1000000,1,-3)
c = [3*a[i]-2*b[i] for i in range(0,len(a))]
```

```python
# 高速方法
```

```python colab={} colab_type="code" id="XtXkhm_KezvJ"
%%time
import numpy as np 
array_a = np.arange(1,1000000,3)
array_b = np.arange(1000000,1,-3)
array_c = 3*array_a - 2*array_b
```

## 15,使用np.ufunc代替math.func

```python
# 低速方法
```

```python
%%time
import math
a = range(1,1000000,3)
b = [math.log(x) for x in a]
```

```python
# 高速方法
```

```python
%%time
import numpy as np 
array_a = np.arange(1,1000000,3)
array_b = np.log(array_a)
```

## 16,使用np.where代替if 

```python
# 低速方法
```

```python
import numpy as np 
array_a = np.arange(-100000,1000000)
```

```python
%%time
# np.vectorize可以将普通函数转换成支持向量化的函数
relu = np.vectorize(lambda x: x if x>0 else 0)
array_b = relu(array_a)
```

```python
# 高速方法
```

```python
%%time
relu = lambda x:np.where(x>0,x,0)
array_b = relu(array_a)
```

<!-- #region colab_type="text" id="l2R07upNezyh" -->
# 七，加速你的Pandas
<!-- #endregion -->

## 17，优先直接使用np.ufunc函数

```python
# 低速方法
```

```python
import numpy as np 
import pandas as pd 
df = pd.DataFrame(np.random.randint(-10,11,size = (100000,26)),
                  columns = list('abcdefghijklmnopqrstuvwxyz'))

%time dfresult = df.applymap(lambda x:np.sin(x)+np.cos(x))
```

```python
# 高速方法
```

```python
%%time
dfresult = np.sin(df) + np.cos(df)
```

<!-- #region colab={} colab_type="code" id="sClqMvcje-np" -->
## 18，避免动态改变DataFrame的行数
<!-- #endregion -->

```python
# 低速方法
```

```python
%%time
import pandas as pd
import numpy as np
df = pd.DataFrame(columns = list('abcdefghijklmnopqrstuvwxyz') )
for i in range(10000):
    df.loc[i,:] = range(i,i+26)
```

```python
# 高速方法
```

```python colab={} colab_type="code" id="uA8k9VIMe-_5"
%%time
import pandas as pd
import numpy as np
df = pd.DataFrame(np.zeros((10000,26)),
                  columns = list('abcdefghijklmnopqrstuvwxyz'))
for i in range(10000):
    df.loc[i,:] = range(i,i+26)
```

# 19，使用csv文件读写代替xlsx文件读写

```python
# 低速方法
```

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(np.random.randint(-10,11,size=(10000,5)),
    columns = list('abced'))

```

```python
# 低速方法
```

```python
%%time
df.to_excel('data.xlsx')
```

```python
# 高速方法
```

```python
%%time
df.to_csv('data.csv')
```

```python

```

## 20，使用pandas多进程工具pandarallel

```python
# 低速方法
```

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(np.random.randint(-10,11,size=(10000,26)),
                 columns = list('abcdefghijklmnopqrstuvwxyz'))
```

```python
%%time
result = df.apply(np.sum,axis = 1) 
```

```python
# 高速方法
```

```python
!pip install pandarallel
```

```python
%%time
from pandarallel import pandarallel 
pandarallel.initialize(nb_workers=4) 
result = df.parallel_apply(np.sum,axis = 1)  
```

```python

```

<!-- #region colab={} colab_type="code" id="9Pje2PJZfFzy" -->
# 八，使用Dask进行加速
<!-- #endregion -->

## 21，使用dask加速dataframe

```python
# 低速方法
```

```python
import numpy as np
import pandas as pd                     

df = pd.DataFrame(np.random.randint(0,6,size=(100000000,5)),
                 columns = list('abcde'))   

%time df.groupby('a').mean()    

```

```python
# 高速方法
```

```python
!pip install dask 
```

```python
import dask.dataframe as dd
df_dask = dd.from_pandas(df,npartitions=40)
%time df_dask.groupby('a').mean().compute()
```

## 22，使用dask.delayed应用多进程加速

```python
# 低速方法
```

```python colab={} colab_type="code" id="PcMQnVR8fFub"
import time
def muchjob(x):
    time.sleep(5)
    return(x**2)
```

```python
%%time
result = [muchjob(i) for i in range(5)]
result
```

```python
# 高速方法
```

```python colab={} colab_type="code" id="PcMQnVR8fFub"
%%time
from dask import delayed,compute
from dask import threaded,multiprocessing
values = [delayed(muchjob)(i) for i in range(5)]
result = compute(*values,scheduler='multiprocessing')
```

<!-- #region colab_type="text" id="yoC9Qp1se_IR" -->
# 九，应用多线程多进程加速
<!-- #endregion -->

## 23，使用多线程提升IO密集任务效率

```python
# 低速方法
```

```python
%rm -rf *.txt
```

```python
%%time
def writefile(i):
    with open(str(i)+'.txt','w') as f:
        s = ('hello %d'%i)*10000000
        f.write(s)
        
# 串行任务
for i in range(30):
    writefile(i)
```

```python
# 高速方法
```

```python
%%time
import threading

def writefile(i):
    with open(str(i)+'.txt','w') as f:
        s = ('hello %d'%i)*10000000
        f.write(s)

# 多线程任务
thread_list = []    
for i in range(30):
    t =threading.Thread(target=writefile,args=(i,))
    t.setDaemon(True)  #设置为守护线程
    thread_list.append(t)

for t in thread_list:
    t.start() #启动线程

for t in thread_list:
    t.join() #等待子线程结束
```

## 24，使用多进程提升CPU密集任务效率

```python
# 低速方法
```

```python
%%time
import time

def muchjob(x):
    time.sleep(5)
    return(x**2)

#串行任务
ans = [muchjob(i) for i in range(8)]
print(ans)
```

```python
# 高速方法
```

```python
%%time
import time
import multiprocessing

def muchjob(x):
    time.sleep(5)
    return(x**2)

#多进程任务
pool = multiprocessing.Pool(processes=4)
result = []
for i in range(8):
    result.append(pool.apply_async(muchjob, (i,)))
pool.close()
pool.join()
ans = [res.get() for res in result]
print(ans)
```

```python

```

```python

```
