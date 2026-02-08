import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';

const COCODatasetView = () => {
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [imageFileName, setImageFileName] = useState('');
  const [annotationFileName, setAnnotationFileName] = useState('');
  const canvasRef = useRef(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [message, setMessage] = useState('');
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [jsonData, setJsonData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // 处理图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // 修改缩放处理函数
  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  // 开始标注处理
  const handleStartAnnotation = () => {
    if (!image || !jsonData) {
      setMessage('请先上传图片和标注文件！');
      return;
    }
    setIsAnnotating(true);
    setMessage('开始处理标注...');
    
    try {
      // 找到当前图片对应的标注
      const fileName = imageFileName.split('/').pop();
      const imageInfo = jsonData.images.find(img => img.file_name === fileName);
      
      if (!imageInfo) {
        setMessage('未找到对应图片的标注信息');
        setIsAnnotating(false);
        return;
      }

      // 获取该图片的所有标注
      const imageAnnotations = jsonData.annotations
        .filter(anno => anno.image_id === imageInfo.id)
        .map(anno => {
          // 获取类别名称
          const category = jsonData.categories.find(cat => cat.id === anno.category_id);
          return {
            name: category ? category.name : '未知类别',
            bbox: anno.bbox, // COCO格式: [x, y, width, height]
          };
        });

      setAnnotations(imageAnnotations);
      setMessage('标注处理成功！可以使用滑块调节缩放，按住鼠标拖动画布。');
    } catch (error) {
      setMessage(`标注处理失败：${error.message}`);
    } finally {
      setIsAnnotating(false);
    }
  };

  // 标注文件上传处理
  const handleAnnotationUpload = (e) => {
    const file = e.target.files[0];
    setAnnotationFileName(file.name);
    setAnnotations([]);
    setMessage('');
    setIsAnnotating(false);

    // 添加JSON文件读取逻辑
    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonContent = JSON.parse(event.target.result);
          setJsonData(jsonContent);
        } catch (error) {
          setMessage('JSON解析失败：' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加重置函数
  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // 修改绘制效果
  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // 设置画布尺寸为图片尺寸
      canvas.width = image.width;
      canvas.height = image.height;
      
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 应用缩放和平移
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);
      
      // 绘制图片
      ctx.drawImage(image, 0, 0);
      
      // 绘制标注
      annotations.forEach(anno => {
        const [x, y, width, height] = anno.bbox;
        
        // 绘制边界框
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2 / scale;
        ctx.strokeRect(x, y, width, height);
        
        // 绘制类别标签背景
        const label = anno.name;
        const labelWidth = ctx.measureText(label).width + 10;
        const labelHeight = 20 / scale;
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x, y - labelHeight, labelWidth, labelHeight);
        
        // 绘制类别标签文字
        ctx.fillStyle = '#000000';
        ctx.font = `${16 / scale}px Arial`;
        ctx.fillText(label, x + 5, y - 5);
      });
      
      ctx.restore();
    }
  }, [image, annotations, scale, offset]);

  // 修改 JsonViewer 组件
  const JsonViewer = ({ data }) => {
    const [expanded, setExpanded] = useState({});
    const MAX_ITEMS = 20; // 最大显示项数

    const toggleExpand = (path) => {
      setExpanded(prev => ({
        ...prev,
        [path]: !prev[path]
      }));
    };

    const renderValue = (value, path) => {
      if (value === null) return <span className="text-gray-500 dark:text-gray-400">null</span>;
      if (typeof value === 'boolean') return <span className="text-blue-700 dark:text-blue-400">{value.toString()}</span>;
      if (typeof value === 'number') return <span className="text-green-700 dark:text-green-400">{value}</span>;
      if (typeof value === 'string') return <span className="text-red-700 dark:text-red-400">"{value}"</span>;
      
      if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        const displayItems = value.slice(0, MAX_ITEMS);
        const hasMore = value.length > MAX_ITEMS;
        
        return (
          <div>
            <span onClick={() => toggleExpand(path)} className="cursor-pointer text-gray-800 dark:text-gray-200">
              {expanded[path] ? '▼' : '▶'} Array[{value.length}]
            </span>
            {expanded[path] && (
              <div className="ml-5">
                {displayItems.map((item, i) => (
                  <div key={i}>
                    <span className="text-gray-600 dark:text-gray-400">{i}: </span>
                    {renderValue(item, `${path}.${i}`)}
                  </div>
                ))}
                {hasMore && (
                  <div className="text-gray-600 dark:text-gray-400 italic">
                    ... 还有 {value.length - MAX_ITEMS} 项未显示
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      if (typeof value === 'object') {
        const entries = Object.entries(value);
        const displayEntries = entries.slice(0, MAX_ITEMS);
        const hasMore = entries.length > MAX_ITEMS;

        return (
          <div>
            <span onClick={() => toggleExpand(path)} style={{cursor: 'pointer'}}>
              {expanded[path] ? '▼' : '▶'} Object{hasMore ? ` (显示 ${MAX_ITEMS}/${entries.length} 项)` : ''}
            </span>
            {expanded[path] && (
              <div className="ml-5">
                {displayEntries.map(([key, val]) => (
                  <div key={key}>
                    <span className="text-gray-800 dark:text-gray-200">{key}: </span>
                    {renderValue(val, `${path}.${key}`)}
                  </div>
                ))}
                {hasMore && (
                  <div className="text-gray-600 dark:text-gray-400 italic">
                    ... 还有 {entries.length - MAX_ITEMS} 项未显示
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }
    };

    return (
      <div className="font-mono bg-gray-50 dark:bg-gray-800 p-4 rounded max-h-[500px] overflow-auto">
        {renderValue(data, 'root')}
      </div>
    );
  };

  const handleIdSearch = () => {
    if (!jsonData || !searchId) {
      setMessage('请先上传标注文件并输入要搜索的 Image ID！');
      return;
    }

    try {
      const id = parseInt(searchId);
      const results = {
        images: jsonData.images.filter(img => img.id === id),
        annotations: jsonData.annotations.filter(anno => anno.image_id === id)
      };

      if (Object.values(results).every(arr => arr.length === 0)) {
        setMessage(`未找到ID为 ${id} 的相关信息`);
        setSearchResults(null);
      } else {
        setMessage(`找到ID为 ${id} 的相关信息`);
        setSearchResults(results);
      }
    } catch (error) {
      setMessage('搜索失败：' + error.message);
    }
  };

  const SearchResultsViewer = ({ results }) => {
    if (!results) return null;
    
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-5">
        <h4 className="text-gray-900 dark:text-gray-100 mb-2">搜索结果：</h4>
        {Object.entries(results).map(([key, value]) => (
          value.length > 0 && (
            <div key={key}>
              <h5 className="text-gray-600 dark:text-gray-400 mb-2">{key}:</h5>
              <JsonViewer data={value} />
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <Layout
      title="COCO数据集查看器"
      description="COCO目标检测数据集可视化工具">
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl text-gray-900 dark:text-gray-100 mb-8 text-center">
          COCO数据集查看器
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
          <h3 className="mb-4 text-gray-900 dark:text-gray-100 text-lg md:text-xl">
            📝 使用说明
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-2">
            1. COCO数据集文件结构：
          </p>
          <ul className="ml-5 mb-2.5 text-gray-700 dark:text-gray-300">
            <li>图片文件位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">train2017</code> 或者 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">val2017</code> 目录</li>
            <li>标注文件位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">annotations_trainval2017\annotations</code> 目录下的 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">instances_train2017.json</code> 或者 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">instances_val2017.json</code></li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-2">2. 选择对应的图片文件（.jpg）和标注文件（.json）进行可视化。</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">3. COCO 数据集下载页面：
            <a href="https://cocodataset.org/#download" 
               target="_blank"
               className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              COCO Dataset Download
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">4. 如果大家在为科研或就业做学习准备，想找大佬1V1带的话，可以戳 <a href="https://www.bilibili.com/opus/633620127076581396" className="text-blue-600 dark:text-blue-400 hover:underline"> 给大家推荐大佬1对1带着学</a>，我们合作很久了，很靠谱的大牛团队 </p>
        </div>

        <div className="text-center mb-4">
          {imageFileName && <p className="text-gray-700 dark:text-gray-300">图片文件: {imageFileName}</p>}
          {annotationFileName && <p className="text-gray-700 dark:text-gray-300">标注文件: {annotationFileName}</p>}
        </div>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="imageUpload"
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer inline-block transition-colors"
            >
              📷 上传图片文件
            </label>
          </div>

          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleAnnotationUpload}
              id="annotationUpload"
              className="hidden"
            />
            <label
              htmlFor="annotationUpload"
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer inline-block transition-colors"
            >
              📄 上传COCO标注文件
            </label>
          </div>

          <button
            onClick={handleStartAnnotation}
            disabled={isAnnotating}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white rounded transition-colors min-w-[120px] h-[41px] disabled:opacity-70"
          >
            {isAnnotating ? '处理中...' : '开始标注'}
          </button>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer transition-colors min-w-[120px] h-[41px]"
          >
            重置视图
          </button>
        </div>

        {message && (
          <div className={`text-center mb-4 p-2.5 rounded ${
            message.includes('成功') 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-gray-600 dark:text-gray-400">缩放: {scale.toFixed(1)}x</span>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleScaleChange}
            className="w-[200px] h-1 bg-gray-300 dark:bg-gray-600 rounded appearance-none cursor-pointer"
            style={{
              outline: 'none'
            }}
          />
        </div>

        <div className="flex justify-center mt-5 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        <div className="flex gap-4 justify-center mt-8 items-center">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="输入要搜索的ID"
            className="px-2 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-[200px]"
          />
          <button
            onClick={handleIdSearch}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer transition-colors"
          >
            搜索ID
          </button>
        </div>

        {searchResults && <SearchResultsViewer results={searchResults} />}

        {jsonData && (
          <div className="mt-8">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4">标注文件结构</h3>
            
            <JsonViewer data={jsonData} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default COCODatasetView;
