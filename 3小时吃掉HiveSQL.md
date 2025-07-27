前方干货预警： 这可能是你能够找到的最清晰最系统的适合算法工程师入门和进阶的SQL教程。

算法工程师的日常工作避免不了处理大量数据。

处理大数据的标准语言是SQL，常见的包括HiveSQL/SparkSQL/Trino，它们的语法基本和HiveSQL相差不大。

扎实的SQL功底可以让你在大数据的海洋中畅游无阻。

下面这10个问题，可以小小地检查一下你的SQL基础是否扎实。

* 1，insert into 和 insert overwrite有什么区别？

* 2，数据表分区和分桶的区别是什么？分桶有什么用？

* 3，常用select查询语句的执行顺序是什么？给出join、groupby、where 和窗口函数 的执行顺序排序。

* 4，with as语句有什么作用？

* 5，左表 left join 右表，返回的行数有可能大于左表的行数吗？左表 semi join 右表，返回的行数有可能大于左表的行数吗？

* 6，COALESCE函数 和NVL 函数的作用是什么？

* 7,  窗口函数使用ROWS BETWEEN 和 RANGE BETWEEN确定窗口范围有什么区别？

* 8,  group by 分组时遇到某个分组的key数据特别多，发生数据倾斜怎么办？

* 9，MapJoin和SknewJoin性能优化的原理是什么？

* 10，排序操作 order by 和 sort by有什么区别？如何对大数据topk 排序进行性能优化？

以上的这些问题，都可以在下面的这个HiveSQL教程中找到。enjoy!




## 一， SQL 概述

根据用途，SQL 语法可以分为一下几个部分。

* DDL: 数据定义语言(CREATE，ALTER，DROP，DECLARE)

* DML: 数据操纵语言(SELECT，DELETE，UPDATE，INSERT)

* DCL: 数据控制语言(GRANT，REVOKE，COMMIT，ROLLBACK)

注意：SQL 对大小写不敏感！


### 1，数据定义语言

DDL(Data Definition Language)

关键词：
* create(建表和数据库)
* drop(删除表)
* alter(更改表)
* truncate(清空表)
* use(切换数据库)
* show(显示数据库,表信息)
* desc(查看表结构)

常用语句: 
```sql
--创建分区表
DROP TABLE IF EXISTS basedb.sales;
CREATE TABLE IF NOT EXISTS basedb.sales
(sale_id INT,
 product string COMMENT '产品名称',
 amount double COMMENT '销量')
 PARTITIONED BY (year INT, month INT)
```

### 2，数据操纵语言

DML(Data Manipulatin Language)

关键词: 
* select(数据查询)
* insert(插入记录)
* update(更新记录)
* delete(删除记录)

注意：insert插入数据到分区有两种方式， Insert overwrite 和 Insert into,  前者是覆盖分区，后者是追加数据。

常用语句： 

```sql 
-- 插入数据到指定分区(覆盖分区)
INSERT OVERWRITE  TABLE basedb.sales PARTITION (year='2025', month='01')
SELECT id, amount, date
FROM tmpdb.raw_sales;


-- 动态插入数据到分区(追加数据)
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;
INSERT INTO TABLE basedb.sales PARTITION (year, month)
SELECT id, amount, date, year, month
FROM tmpdb.raw_sales;
```

```sql 
--数据查询select语句常用模版
SELECT ... 
    FROM 表1 JOIN 表2
ON 等值连接 
WHERE 分组前过滤条件 
GROUP BY 分组字段 
HAVING 分组后过滤条件 
ORDER BY 排序字段
```


### 3，数据控制语言

DCL(Data Control Language)

关键词：
* grant(授权)
* revoke(撤销权限)
* commit(提交事务)
* rollback(回滚事务)

常用语句：
```sql
-- 授权用户访问表权限
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE basedb.sales TO USER user1;
-- 撤销用户访问表权限
REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE basedb.sales FROM USER user1;

-- 提交事务
COMMIT;
-- 回滚事务
ROLLBACK;
```


##  二，数据存储结构

按颗粒度从大到小的顺序，Hive数据存储单元被组织为：

* 数据库 Databases
* 数据表 Tables
* 分区 Partitions
* 桶或簇 Buckets 

### 1，数据库

数据库是一个名称空间，作用是避免表、视图、分区、列等的命名冲突。

数据库还可用于为用户或用户组实施安全性

### 2，数据表

具有相同模式的同质数据单元。

一个数据库里可以有多张表。

### 3，分区

每个表可以有一个或多个分区键，用于确定数据的存储方式。

分区除了作为存储单元外，还允许用户有效地识别满足指定条件的行。

分区列（Partition columns）是虚拟列，它们不是数据本身的一部分，而是在加载时派生的。

### 4，分桶

每个分区中的数据又可以基于表的某一列的散列函数的值被划分为桶。

分桶表用于需要高效连接操作、数据抽样和均匀负载的场景，特别是在大数据集和复杂查询中。


分桶和分区的区别：

* 每个分区对应一个子目录，每个分桶对应一个文件。

* 分区字段不是实际的列，分桶字段必须是实际的列。

* 分区表的分区数量可以一直增长，而分桶表创建好之后桶的数量就固定不变了。


```sql
--创建同时有分区和分桶的表
CREATE TABLE orders (
    order_id INT,
    user_id INT,
    amount DOUBLE,
    order_date STRING
)
PARTITIONED BY (order_month STRING)  -- 按月份分区
CLUSTERED BY (user_id) INTO 10 BUCKETS  -- 按用户ID分桶，共10个桶
STORED AS ORC;  -- 使用ORC存储格式，提升查询性能
```



```SQL 

-- BucketMapJoin 支持大表对大表的连接，且不用shuffle.

--1，创建桶表
CREATE TABLE large_table_A (
    id INT,
    value STRING
)
CLUSTERED BY (id) INTO 8 BUCKETS
STORED AS ORC;

CREATE TABLE large_table_B (
    id INT,
    description STRING
)
CLUSTERED BY (id) INTO 8 BUCKETS
STORED AS ORC;

INSERT over large_table_A 


--2，启用 BucketMapJoin 优化
SET hive.optimize.bucketmapjoin=true;
SET hive.optimize.bucketmapjoin.sortedmerge=true;

-- 基于桶的连接查询
SELECT a.id, a.value, b.description
FROM large_table_A a
JOIN large_table_B b
ON a.id = b.id;
```

## 三， 常用数据类型

hive 支持常用的基础数据类型和一些复杂类型。



### 1，基础数据类型

* 整数类型
    - TINYINT: 1字节的有符号整数 (-128~127)
    - SMALLINT: 2字节的有符号整数 (-32768~32767)
    - INT: 4字节的有符号整数 (-2^31~2^31-1)
    - BIGINT: 8字节的有符号整数 (-2^63~2^63-1)

* 浮点数类型
    - FLOAT: 单精度浮点数
    - DOUBLE: 双精度浮点数
    - DECIMAL: 精确的小数值，常用于金融计算

* 字符串类型
    - STRING: 字符串，无长度限制
    - VARCHAR: 可变长度字符串
    - CHAR: 固定长度字符串

* 其他基础类型
    - BOOLEAN: 布尔类型 (TRUE/FALSE)
    - TIMESTAMP: 时间戳
    - DATE: 日期类型
    - BINARY: 二进制数据

### 2，复杂数据类型

* ARRAY: 有序的相同类型的集合，如 ARRAY<STRING>
* MAP: 键值对的集合，如 MAP<STRING, INT>
* STRUCT: 不同数据类型的命名字段的集合，如 STRUCT<name:STRING, age:INT>
* UNION: 不同数据类型的联合体，如 UNIONTYPE<STRING, INT>

### 3，数据类型转换


Hive 支持隐式转换 和 显式转换。

(1) 隐式转换
- 自动进行，无需显式转换语句
- 数据类型按精度从低到高转换
- 转换规则:
    * TINYINT -> SMALLINT -> INT -> BIGINT
    * INT -> DOUBLE
    * FLOAT -> DOUBLE
    * STRING -> DOUBLE
    * STRING <-> DATE/TIMESTAMP

例如:
```sql
-- 隐式将 TINYINT 转为 INT
SELECT CAST(1 AS TINYINT) + 100;  

-- STRING 自动转为 DOUBLE
SELECT '3.14' + 2.0;
```

(2) 显式转换

- 使用 CAST 函数进行强制类型转换
- 语法: CAST(value AS type)

例如:
```sql
-- 数值转字符串
SELECT CAST(123.45 AS STRING);

-- 字符串转日期
SELECT CAST('2023-01-01' AS DATE);

-- 字符串转整数
SELECT CAST('100' AS INT);
```

注意:显式转换失败时会返回 NULL。应确保源数据符合目标类型的格式要求。



## 四， 基本查询

### 1，查询执行顺序

SQL语句的执行顺序指的是在执行一个完整的SQL查询时，各个子句的处理顺序。

以下是SQL SELECT语句的执行顺序：

* 1，FROM: 首先处理FROM子句，从指定的表中选择数据。
* 2，JOIN: 处理JOIN操作（如果有的话），将多个表连接起来。
* 3，WHERE: 过滤记录，只保留满足条件的记录。
* 4，GROUP BY: 将记录分组。
* 5，HAVING: 过滤分组后的记录，只保留满足条件的分组。
* 6，SELECT: 选择需要的列， 若使用窗口函数，也在这个环节执行。
* 7，DISTINCT: 去除重复的记录。
* 8，ORDER BY: 对记录进行排序。
* 9，LIMIT: 限制返回的记录数。

下面是一个范例

```sql 
SELECT DISTINCT column1, column2
FROM table1
JOIN table2 ON table1.id = table2.id
WHERE condition
GROUP BY column1
HAVING condition
ORDER BY column1
LIMIT 10;

```

执行顺序为:

* 1，FROM table1
* 2，JOIN table2 ON table1.id = table2.id
* 3，WHERE condition
* 4，GROUP BY column1
* 5，HAVING condition
* 6，SELECT DISTINCT column1, column2
* 7，ORDER BY column1
* 8，LIMIT 10


可以用 explain 关键字来查看SQL语句的执行计划，以便更好地理解SQL语句的执行顺序。


### 2，with as 子查询

查询语句可以嵌入子查询。

常见的子查询形式是使用括号包裹起来的子查询。

但是这种方式嵌套很深，可读性很差。

hive 和 mysql 等主流关系型数据库的较高版本，都支持 with as 语法。

```SQL 
--嵌套的子查询写法
SELECT subquery.column1, subquery.column2, table2.column3
FROM (
    SELECT column1, column2
    FROM table1
    WHERE condition
) AS subquery
JOIN table2 ON subquery.id = table2.id
WHERE another_condition
ORDER BY subquery.column1;
```




```SQL 
-- with  as 子查询写法
WITH subquery_name AS (
    SELECT column1, column2
    FROM table1
    WHERE condition
) --注意这里没有分号，with as 不是一条独立的语句，而是作为一个子查询
SELECT subquery_name.column1, subquery_name.column2, table2.column3
FROM subquery_name
JOIN table2 ON subquery_name.id = table2.id
WHERE another_condition
ORDER BY subquery_name.column1;
```



## 五， 表连接 join 

join 是根据 关键字段 横向连接 两个表。要求两个表具有相同的关键字段。

join有多种不同的类型。



### 1， 内连接（INNER JOIN） 

最常用的join 就是 inner join。

inner join 只返回两个表中关联字段匹配的记录。

inner join 中的 inner可以省略，直接写作join。

```sql
SELECT a.*, b.*
FROM table_a a
JOIN table_b b
  ON a.id = b.id;
```

### 2，左外连接（LEFT OUTER JOIN）

返回左表中的所有记录，以及右表中匹配的记录。如果右表没有匹配，则返回 NULL。

```SQL 
SELECT a.*, b.*
FROM table_a a
LEFT OUTER JOIN table_b b
  ON a.id = b.id;
```

### 3，右外连接 （RIGHT OUTER JOIN）

与左外连接相反，返回右表中的所有记录及左表中匹配的记录。

```SQL 
SELECT a.*, b.*
FROM table_a a
RIGHT OUTER JOIN table_b b
  ON a.id = b.id;
```

### 4，全外连接（FULL OUTER JOIN）

返回两个表中所有的记录，当没有匹配时以 NULL 代替。

```SQL 
SELECT a.*, b.*
FROM table_a a
FULL OUTER JOIN table_b b
  ON a.id = b.id;
```

### 5，半连接（SEMI JOIN）

Hive 中的 LEFT SEMI JOIN 用于返回左表中在右表中存在匹配记录的所有行，但只返回左表的字段。

当只关心左表是否存在关联数据时非常高效。

```SQL 
SELECT a.*
FROM table_a a
LEFT SEMI JOIN table_b b
  ON a.id = b.id;
```

### 6，反连接 (ANTI JOIN)

Hive 从 2.0 版本开始，正式支持 LEFT ANTI JOIN。

LEFT ANTI JOIN 用于返回左表中在右表中没有匹配记录的数据，也就是常说的 anti join.

```SQL 
--存在左表中，但是不在右表中
SELECT a.*
FROM table_a a
LEFT ANTI JOIN table_b b
  ON a.join_key = b.join_key;
```

如果是较低版本的hive，可以通过 left join 后判断右表字段是否为NULL 来达到相同效果。

```SQL 
-- 通过 LEFT JOIN 后判断右表字段是否为 NULL 来达到 anti join 的效果

SELECT a.*
FROM table_a a
LEFT JOIN table_b b
  ON a.join_key = b.join_key
WHERE b.join_key IS NULL;
```


### 7，交叉连接（CROSS JOIN）

返回两个表的笛卡尔积，即每个表的每一行都与另一个表的每一行组合在一起。

```SQL 
SELECT a.*, b.*
FROM table_a a
CROSS JOIN table_b b;
```


## 六，表合并 union 

join是横向连接，而union是纵向拼接。

union操作需要拼接的两个表具有完全相同的字段数量和字段数据类型(可以列名不一样，结果会取第一个表的列名)。

需要注意的是，在Hive中一般只支持UNION ALL，即直接连接各个查询的结果，而不会自动去除重复的记录。

这与SQL中有些数据库默认的UNION（去重）行为略有不同。

如果希望得到不重复的数据，通常需要在UNION ALL之后使用DISTINCT或其他去重方法。


```SQL 
SELECT column_a FROM table1
UNION ALL
SELECT column_a FROM table2;
```

如果你希望去除重复行，可以再在外面嵌套一层去重逻辑。



```SQL 
SELECT DISTINCT column_a FROM (
  SELECT column_a FROM table1
  UNION ALL
  SELECT column_a FROM table2
) t;

```

在实践中，UNION ALL 这个函数常常用来手工新建一些比较小的表，例如模型/数据版本控制表。


```SQL 
DROP TABLE IF EXISTS base_db.predict_data_version;
CREATE TABLE IF NOT EXISTS base_db.predict_data_version AS
select 'V1.1' as predict_version, 0 as used_version union all
select 'V1.5' as predict_version, 0 as used_version union all 
select 'V2.0' as predict_version, 0 as used_version union all 
select 'V2.1.0' as predict_version, 0 as used_version union all 
select 'V2.1.5' as predict_version, 0 as used_version union all 
select 'V3.0.0' as predict_version, 1 as used_version; 
  --线上应用数据数据
```



## 七，表分组 group by 


### 1，group by 基本用法

在Hive中，GROUP BY操作用于将数据分组，并对每个分组应用聚合函数。

常用的聚合函数包括： 

- COUNT：计算分组中的行数
- SUM:：计算分组中数值列的总和
- AVG：计算分组中数值列的平均值
- MAX: 计算分组中数值列的最大值
- MIN：计算分组中数值列的最小值
- COLLECT_SET: 将分组中的值收集到一个集合中(去重)
- COLLECT_LIST: 将分组中的值收集到一个列表中(不去重)

可以在GROUP BY子句中使用HAVING子句来过滤分组。

HAVING子句类似于WHERE子句，但它只能用于分组后的过滤。

```SQL 
SELECT
  region,
  category,
  COUNT(*) AS num_sales,
  SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY region, category
HAVING COUNT(*) > 10 AND SUM(sales_amount) > 8000;

```

### 2，group by 与统计量对比

GROUP BY 操作对于  数据科学/数据分析 具有至关重要的意义。

从一定意义上说，数据科学的精髓 就是 统计量对比。

没有统计量，就无法抓住关键信息，就无法避免被淹没在充满噪声的样本数据的海洋中。

没有对比，就无法感知差异，就无法用雄辩的实验数据验证我们的逻辑假设。

数据科学常常是按照这样的模式进行的：
  

* 给定研究线索

* 构造统计量对比(不同时间，空间，分组，版本之间对比) 【Observation】

* 针对差异提出理论假设 【Reson】

* 根据理论假设演绎行动推论 【Reson】

* 实施实验动作 【Action】

* 查看新的统计量对比。【Observation】


下面这个例子是针对 一个 销量预测实验数据 构造的统计量对比范例代码。

一方面在 不同版本之间对比，另一方面也在不同日期的预测之间对比。


```SQL 
-- 各个版本不同日期销量预测总量对比
WITH summed_predictions AS (
  select predict_version, cal_dt, sum(num_pred) as num_pred_sum
  from mkt_db.sales_predict_data 
  where cal_dt  between '2024-12-05' and '2025-01-22'
  and predict_version in  ('V2.0','V3.0.0','V3.1.0')  
  group by predict_version, cal_dt
)
select cal_dt, 
  SUM(CASE WHEN predict_version = 'V2.0' THEN num_pred_sum ELSE 0 END) AS sum_V2_0,
  SUM(CASE WHEN predict_version = 'V3.0.0' THEN num_pred_sum ELSE 0 END) AS sum_V3_0_0,
  SUM(CASE WHEN predict_version = 'V3.1.0' THEN num_pred_sum ELSE 0 END) AS sum_V3_1_0
from summed_predictions
group by cal_dt
order by cal_dt;
```


## 八，表分窗 over 

分窗操作 和 分组操作 具有一些相同点，也有不同点。

相同点是 它们 都要根据一些字段将数据分块(分窗/分组)，并在分块范围内应用计算函数。 

不同点是 分窗操作 在分窗上应用的是 窗口函数，不会改变返回结果的行数。

而 分组操作在分组上应用的是 聚合函数， 会把每个分组变成一行，减少了返回结果的行数。

分窗操作通过 over子句来实现。



### 1，分窗语法

基本语法如下

```sql
<聚合/窗口函数> OVER (
    [PARTITION BY <分组列>]
    [ORDER BY <排序列>]
    [ROWS/RANGE BETWEEN <窗口范围>]
)
```

- `PARTITION BY`：指定分组列，将数据分成不同的组。
- `ORDER BY`：指定排序列，对每个分组内的数据进行排序。
- `ROWS/RANGE BETWEEN`：指定窗口范围，定义窗口的大小。

其中ROWS BETWEEN是根据物理行来确定窗口范围。

RANGE BETWEEN是根据排序的值的来确定窗口范围。

需要注意的是 有没有指定窗口范围 会影响后续窗口函数取值的含义。


```SQL 
-- 未指定 窗口范围，计算的是全窗口内的总工资(每行都返回一样的值)
SELECT
    emp_id,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
    ) as window_sum
FROM
    employees;


-- 指定 ROWS，计算的是窗口范围内的累积工资(每行返回的值是递增的)
SELECT
    emp_id,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
        ORDER BY emp_id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sum
FROM
    employees;
```



### 2，分窗范例

分窗操作的常见用途包括：

- 计算排名
- 计算累计和
- 计算移动平均值


```SQL

-- 1. 计算每个类别的销售排名：
SELECT
    category,
    sales_date,
    sales_amount,
    RANK() OVER (
        PARTITION BY category 
        ORDER BY sales_amount DESC
    ) AS sales_rank
FROM sales_data;

-- 2. 计算每个类别的累计销售额
SELECT
    category,
    sales_date,
    sales_amount,
    SUM(sales_amount) OVER (
        PARTITION BY category 
        ORDER BY sales_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_sales
FROM sales_data;


-- 3. 计算每个类别的移动平均销售额（计算前面6行和当前行的均值）
-- 如果 sales_date 列具有重复值（即同一天有多条记录），参与计算的依然是7行。

RANGE BETWEEN 是基于值的范围，所以它关注的是日期范围，而 ROWS BETWEEN 是基于行的范围，所以它关注的是行数。
SELECT
    category,
    sales_date,
    sales_amount,
    AVG(sales_amount) OVER (
        PARTITION BY category
        ORDER BY sales_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_avg
FROM sales_data;



-- 3. 计算每个类别的移动平均销售额（计算过去6天和当前行的均值）
-- 如果 sales_date 列具有重复值（即同一天有多条记录），参与计算的可能会超过7行。
SELECT
  category,
  sales_date,
  sales_amount,
  AVG(sales_amount) OVER (
    PARTITION BY category 
    ORDER BY sales_date 
    RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW
  ) AS rolling_avg
FROM
  sales_data;

```


### 3，常用窗口函数

```SQL 
-- (1) ROW_NUMBER(): 返回分区中每行的唯一行号，从1开始。
-- 假设salary取值： 8w, 7w, 5w, 5w, 3w, 1w, 1w
-- row_num结果取值：1,  2,  3,  4,  5,  6,  7
SELECT
    emp_id,
    salary,
    ROW_NUMBER() OVER (
        ORDER BY salary DESC
    ) as row_num
FROM
    employees;


-- (2) RANK(): 返回分区中每行的排名，相同值的行会有相同的排名，排名中有跳跃。
-- 假设salary取值： 8w, 7w, 5w, 5w, 3w, 1w, 1w
-- rank的 结果取值： 1,  2,  3,  3,  5,  6,  6
SELECT
    emp_id,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) as rank
FROM
    employees;

-- (3) DENSE_RANK(): 返回分区中每行的排名，相同值的行会有相同的排名，但排名不跳跃。
-- 假设salary取值： 8w, 7w, 5w, 5w, 3w, 1w, 1w
-- dense_rank取值： 1,  2,  3,  3,  4,  5,  5

SELECT
    emp_id,
    salary,
    DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) as dense_rank
FROM
    employees;

-- (4) LAG(): 返回当前行前面第 N 行的值，若不存在则返回默认值。
--例子：计算销量前后值的差异
SELECT
  sales_date,
  sales_amount,
  LAG(sales_amount, 1, 0) OVER (ORDER BY sales_date) AS previous_sales,
  sales_amount - LAG(sales_amount, 1, 0) OVER (ORDER BY sales_date) AS sales_difference
FROM
  sales_data;

-- (5) LEAD(): 返回当前行后面第 N 行的值，若不存在则返回默认值。
--例子：联合使用LEAD和LAG来计算滚动平均值(3日滚动)。
SELECT
  sales_date,
  sales_amount,
  (sales_amount +
   LAG(sales_amount, 1, 0) OVER (ORDER BY sales_date) +
   LEAD(sales_amount, 1, 0) OVER (ORDER BY sales_date)) / 3 AS moving_average
FROM
  sales_data;
```


## 九，hive 常用函数

### 1， 条件分支函数

在Hive中，实现条件分支逻辑的常用方法包括

- IF 函数: 适合简单的条件判断。
- CASE WHEN 语句: 适合多分支复杂的条件判断。
- COALESCE 函数: 用于返回第一个非NULL的值。
- NVL 函数: 用于替换NULL值。

下面是这些方法的具体范例。

```SQL 

-- 1，IF(condition, true_value, false_value)
SELECT
   order_id,
   amount,
   IF(amount > 100, 'High', 'Low') AS amount_category
FROM orders;

-- 2，CASE WHEN condition THEN result [WHEN ...] ELSE result END
SELECT
   order_id,
   amount,
   CASE
      WHEN amount > 100 THEN 'High'
      WHEN amount > 50 THEN 'Medium'
      ELSE 'Low'
   END AS amount_category
FROM orders;

-- 3，COALESCE(value1, value2, ..., valueN)
SELECT
   order_id,
   COALESCE(NULL, 'Default Value', amount) AS amount_value
FROM orders;

-- 4, NVL(value, default_value)
SELECT
   order_id,
   NVL(amount, 0) AS amount_value
FROM orders;

```


### 2，日期函数

hive中常用的日期函数包括以下一些。


**当前日期/时间**
- FROM_UNIXTIME(UNIX_TIMESTAMP()) - 当前时间戳
- CURRENT_DATE() - 当前日期
- CURRENT_TIMESTAMP() - 当前时间戳

**日期提取**
- YEAR(date) - 提取年份
- MONTH(date) - 提取月份 (1-12)
- DAY(date) - 提取月份中的天数
- DAYOFWEEK(date) - 提取星期几 (1=星期日, 2=星期一, 等等)
- HOUR(timestamp) - 提取小时
- MINUTE(timestamp) - 提取分钟
- SECOND(timestamp) - 提取秒

**日期格式化**
- DATE_FORMAT(date, format) - 将日期格式化为字符串
- TO_DATE(string) - 将字符串转换为日期

**日期算术**
- DATE_ADD(date, days) - 日期加上天数
- DATE_SUB(date, days) - 日期减去天数
- DATEDIFF(end_date, start_date) - 日期之间的天数






下面是是范例代码

```SQl 
SELECT 
    CURRENT_DATE() as today,
    DATE_ADD(CURRENT_DATE(), 7) as next_week,
    DATE_FORMAT(CURRENT_TIMESTAMP(), 'yyyy-MM-dd HH:mm:ss') as formatted_time,
    DATEDIFF('2024-12-31', CURRENT_DATE()) as days_until_now;
```


### 3，字符串函数


Hive提供了丰富的字符串处理函数，下面是一些范例。


```SQL

-- 字符串长度
SELECT LENGTH('Hello') -- 返回5

-- 字符串连接
SELECT CONCAT('Hello', ' ', 'World') -- 返回'Hello World'

-- 字符串拼接(带分隔符)
SELECT CONCAT_WS(',', 'Hello', 'World') -- 返回'Hello,World'

-- 大小写转换
SELECT UPPER('hello') -- 返回'HELLO'
SELECT LOWER('HELLO') -- 返回'hello'

-- 子字符串
SELECT SUBSTR('Hello World', 1, 5) -- 返回'Hello'

-- 去除空格
SELECT TRIM('  Hello  ') -- 返回'Hello'
SELECT LTRIM('  Hello  ') -- 从左侧去除空格
SELECT RTRIM('  Hello  ') -- 从右侧去除空格

-- 查找子串位置
SELECT INSTR('Hello World', 'World') -- 返回7

-- 字符串替换
SELECT REGEXP_REPLACE('Hello World', 'World', 'Hive') -- 返回'Hello Hive'

-- 字符串分割
SELECT SPLIT('Hello,World,Hive', ',') -- 返回数组['Hello', 'World', 'Hive']

-- 获取字符串第一个出现位置
SELECT LOCATE('o', 'Hello World') -- 返回5

-- 重复字符串
SELECT REPEAT('Hi', 3) -- 返回'HiHiHi'

-- 字符串反转
SELECT REVERSE('Hello') -- 返回'olleH'

-- 从左/右填充字符
SELECT LPAD('Hi', 5, '*') -- 返回'***Hi'
SELECT RPAD('Hi', 5, '*') -- 返回'Hi***'

```


## 十，hive性能优化

### 1， mapreduce原理

hive 性能优化 的前提是 需要理解 hive 引擎(mapreduce 或 spark)的 mapreduce原理。

mapreduce思想原理：分而治之，合并结果。

mapreduce = map + shuffle + reduce。  


举个例子。 

```SQL 
-- 统计每个部门的平均工资
SELECT dept_id, AVG(salary) 
FROM employees 
GROUP BY dept_id;
```

处理过程：

* Map: 读取员工记录，输出 (dept_id, salary) 对
* Shuffle: 按 dept_id 分组，相同部门的工资数据发送到同一个 Reducer
* Reduce: 计算每个部门的工资平均值。

就像在食堂：

* Map = 每个窗口收集各自食材
* Shuffle = 把同类食材分发到对应的厨师那里
* Reduce = 厨师处理收到的食材，做成最终菜品。



有一些计算是只需要 map 操作的。例如： where条件过滤， 简单的select查询， union all 合并。

还有一些计算可能会触发 shuffle 和 reduce 操作。例如: join表连接，group by表分组，order by 排序，over 表分窗。


**hive性能优化的瓶颈最容易发生在shuffle过程，其次是reduce过程，map较少成为性能瓶颈** 


主要是shuffle过程需要先将数据按照key排序，然后将排序的数据序列化后通过网络传输按照key发送给不同的reducer，然后reducer接收到数据后还要反序列化。排序，序列化和反序列化，以及网络传输都是非常耗时的。


reduce过程可能会因为某个key太多，一个reducer要处理的数据量太大，发生数据倾斜的性能瓶颈。 

hive中有一些常用的配置，可以根据需要调整它们来优化hive的性能。


```SQL 

-- 谓词下推优化（将过滤条件下推到靠近源表）
SET hive.optimize.ppd=true;  -- 启用谓词下推
SET hive.optimize.ppd.storage=true;  -- 启用存储层谓词下推

-- 启用向量化
SET hive.vectorized.execution.enabled=true;
SET hive.vectorized.execution.reduce.enabled=true;

-- 启动并行执行 (每个worker多线程增加并行度)
SET hive.exec.parallel=true;
SET hive.exec.parallel.thread.number=16;  -- 线程数根据资源情况设置

-- 启动数据压缩 
SET hive.exec.compress.intermediate=true; --中间数据压缩
SET mapreduce.map.output.compress.codec=org.apache.hadoop.io.compress.SnappyCodec; --压缩格式
SET hive.exec.compress.output=true; --最终数据压缩
SET mapreduce.output.fileoutputformat.compress.codec=org.apache.hadoop.io.compress.SnappyCodec; --压缩格式

-- 合并小文件
SET hive.merge.mapfiles=true;
SET hive.merge.mapredfiles=true;
SET hive.merge.size.per.task=256000000;  -- 256MB
SET hive.merge.smallfiles.avgsize=16000000;  -- 16MB


-- 设置mapper处理的数据量
SET mapreduce.input.fileinputformat.split.maxsize=256000000;  -- 256MB
SET mapreduce.input.fileinputformat.split.minsize=128000000;  -- 128MB

--设置reducer数量
SET mapreduce.job.reduces=10;  -- 根据具体任务调整

```


### 2，group by 性能优化

group by 可能会因为某个key对应的数据量太大，发生数据倾斜导致性能瓶颈。

可以通过以下一些方式优化。

map端预聚合，开启数据倾斜优化，以及 通过子查询打散数据。 

```SQL 
--before(原始查询)
SELECT category_id, COUNT(*) as count
FROM sales_data
GROUP BY category_id;


--after(优化方案)

-- 方案1：开启Map端预聚合
SET hive.map.aggr=true;
SET hive.groupby.mapaggr.checkinterval=100000;

-- 方案2：开启倾斜数据优化(自动处理数据倾斜)
SET hive.groupby.skewindata=true;

-- 方案3：通过子查询打散数据(基本上等价于hive.groupby.skewindata的原理)
SELECT category_id, SUM(cnt) as count
FROM (
    SELECT category_id, COUNT(*) as cnt
    FROM sales_data
    GROUP BY category_id, CAST(RAND()*100 AS INT)  -- 添加随机数打散
) t
GROUP BY category_id;
```



### 3，join  性能优化
  
join的原理从性能优化角度来说，有以下四种类型：
  
* ReduceJoin
* MapJoin
* SkewJoin
 * BucketMapJoin
  
其中最常用的性能优化方法是把普通的ReduceJoin修改为 MapJoin  或者 SkewJoin。（最实用的优化，更改配置即可）
  
 下面分别介绍这些Join方式的实现原理。

 
  **ReduceJoin**
  
 普通的join就是是ReduceJoin，两份数据都要shuffle，然后在reduce阶段完成join，遇到大表时大数据shuffle会比较耗时。

<br>


**MapJoin**： 

MapJoin 过程完全在 Map 阶段完成，无需将数据发送到 Reduce 节点，彻底避免了普通Join的 Shuffle 和 Reduce 的开销。

MapJoin的 实现方式是将小表广播到所有Map任务的内存中，大表的数据按分片分配到各个Map 任务，逐行读取并与内存中的小表哈希表进行匹配实现join。

<br>


**SkewJoin**： 

SkewJoin主要是为了自动解决数据join过程中可能出现的数据倾斜问题。

SkewJoin的实现方式是进行倾斜检测和数据分离，将倾斜key作mapjoin处理，非倾斜key普通join处理，最后合并数据。
  
<br>

**BucketMapJoin**: 
  
BucketMapJoin主要针对两个采用相同的分桶方式分桶的表，并且连接使用的key恰好就是分桶key的情形。

BucketMapJoin无需shuffle，因为数据根据桶号已经预处理了，直接把相同桶号的两份数据放到同一个mapper上处理就可以了。

每个mapper会将两份数据中较小的那份数据做成哈希表放到内存中，然后跟较大的那份数据流式匹配完成join的过程。


<br>
  
 此外，还有一些手动优化方法。

例如，倾斜值隔离处理 以及 加随机数打乱 等方法。
  
 (谨慎使用，比较复杂，代码可读性差)
  

  
下面我们看join优化的一些范例代码。
  
  
```SQL 

-- before(原始查询)
-- 方案0：原始ReduceJoin，也就是普通Join
SELECT a.user_id, a.order_id, b.user_name
FROM orders a
JOIN users b ON a.user_id = b.user_id;


-- after(优化方案)
-- 方案1：开启MapJoin 优化（适用于小表Join大表，小表的默认阈值是25M）
SET hive.auto.convert.join=true;
SET hive.mapjoin.smalltable.filesize=25000000;


-- 方案2：开启 SkewJoin 优化（自动处理数据倾斜，非倾斜key常规处理，倾斜key使MapJoin)
SET hive.optimize.skewjoin=true;
SET hive.skewjoin.key=100000;


-- 方案3： 手动处理，倾斜值隔离处理 (常用于null导致的倾斜)
WITH non_null_users AS (
    SELECT *
    FROM orders
    WHERE user_id IS NOT NULL
),
null_users AS (
    SELECT *
    FROM orders
    WHERE user_id IS NULL
)
SELECT *
FROM (
    -- 处理非NULL值
    SELECT a.*, b.user_name
    FROM non_null_users a
    JOIN users b ON a.user_id = b.user_id
    UNION ALL
    -- 处理NULL值
    SELECT a.*, NULL as user_name
    FROM null_users a
) t;



-- 方案4：手动处理，对随机数打散(加盐)
--步骤①: 对订单表中倾斜的user_id进行打散处理
WITH orders_expanded AS (
    SELECT 
        -- 对倾斜的user_id增加随机后缀 0-9
        CASE 
            WHEN user_id = 'hot_user' THEN CONCAT(user_id, '_', CAST(RAND()*10 AS INT))
            ELSE user_id 
        END AS new_user_id,
        user_id as original_user_id,  -- 保留原始user_id
        order_id
    FROM orders
),

--步骤②: 将用户表复制10份，每份对应一个随机后缀
users_expanded AS (
    -- 处理热点用户数据
    SELECT 
        CONCAT(user_id, '_', suffix) AS new_user_id,
        user_id as original_user_id,
        user_name
    FROM users 
    CROSS JOIN (
        SELECT CAST(id AS STRING) AS suffix 
        FROM (
            SELECT 0 as id UNION ALL SELECT 1 UNION ALL SELECT 2 
            UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
            UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 
            UNION ALL SELECT 9
        ) numbers
    ) suffixes
    WHERE user_id = 'hot_user'
    
    UNION ALL
    
    -- 处理非热点用户数据
    SELECT 
        user_id AS new_user_id,
        user_id as original_user_id,
        user_name
    FROM users
    WHERE user_id != 'hot_user'
)

--步骤③: 最终JOIN查询
SELECT 
    o.original_user_id AS user_id,  -- 使用原始user_id
    o.order_id,
    u.user_name
FROM orders_expanded o
JOIN users_expanded u
ON o.new_user_id = u.new_user_id;

```


最后，如果两个表都使用相同的方式进行分桶，且分桶的key也是连接的key，可以使用BucketMapJoin。

```SQL 
-- 创建桶表
CREATE TABLE bucket_user_logs (
    user_id INT,
    log_time STRING,
    action STRING
)
CLUSTERED BY (user_id) INTO 4 BUCKETS
STORED AS ORC;

CREATE TABLE bucket_user_info (
    user_id INT,
    user_name STRING,
    user_age INT
)
CLUSTERED BY (user_id) INTO 4 BUCKETS
STORED AS ORC;


-- 启用动态分区和分桶表插入
SET hive.exec.dynamic.partition=true;
SET hive.exec.dynamic.partition.mode=nonstrict;
SET hive.enforce.bucketing=true;

-- 插入数据到分区分桶表
INSERT INTO TABLE bucket_user_logs
SELECT user_id, log_time, action
FROM user_logs;

INSERT INTO TABLE bucket_user_info
SELECT user_id, user_name, user_age
FROM user_info;

-- 启用 BucketMapJoin 优化
SET hive.optimize.bucketmapjoin=true;
SET hive.optimize.bucketmapjoin.sortedmerge=true;

-- 基于桶的连接查询
SELECT l.user_id, l.log_time, l.action, i.user_name, i.user_age
FROM bucket_user_logs l
JOIN bucket_user_info i
ON l.user_id = i.user_id;
```



### 4，排序性能优化

hive排序主要用到的有 ordered by  和 sort by. 

此外，还有一些相关的用法，如 distributed by 和 clustered by. 

下面是它们的对比： 

* ordered by: 全局排序。最终输出完全有序。单个reducer处理。（适合数据不大的情况，数据大很慢）

* sort by: 分区内排序。在reducer内部排序，局部排序， 不保证全局有序，较快。

* distributed by: 控制数据按哪些key分发。本身无排序。

* clustered by:  按同一列分发并排序。DISTRIBUTE BY + SORT BY 的组合。




排序常见的优化是取大表topK的排序优化，下面是范例代码。


```SQL 

-- 原始方案： 大表直接 ordered by 取 topK 
SELECT sale_id, amount, product_id, sale_date
from  sales
ORDER BY amount DESC        -- 按销售额排序
LIMIT 100;                  -- 获取前100条记录


-- 优化方案： distribute by + sort by 后再 order by .
SELECT *
FROM (
    SELECT sale_id, amount, product_id, sale_date
    FROM sales
    DISTRIBUTE BY RAND()  -- 随机分布数据
    SORT BY amount DESC   -- 按销售额降序排序
    LIMIT 100           -- 先限制前1000条记录
) t
ORDER BY amount DESC        -- 最终按销售额降序排序
LIMIT 100;                  -- 获取前100条记录


```

