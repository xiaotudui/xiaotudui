import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';

const VOCDatasetView = () => {
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
    if (!image || !annotationFileName) {
      setMessage('请先上传图片和标注文件！');
      return;
    }
    setIsAnnotating(true);
    setMessage('开始处理标注...');
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          parseVOCAnnotation(event.target.result);
          setMessage('标注处理成功！可以使用滑块调节缩放，按住鼠标拖动画布。');
          setIsAnnotating(false);
        } catch (error) {
          setMessage(`标注处理失败：${error.message}`);
          setIsAnnotating(false);
        }
      };
      reader.readAsText(document.getElementById('annotationUpload').files[0]);
    } catch (error) {
      setMessage('标注处理失败：请重新上传文件');
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
  };

  // VOC格式解析函数
  const parseVOCAnnotation = (xmlContent) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    
    const objects = xmlDoc.getElementsByTagName('object');
    const annotationsArray = [];
    
    for (let obj of objects) {
      const bndbox = obj.getElementsByTagName('bndbox')[0];
      annotationsArray.push({
        name: obj.getElementsByTagName('name')[0].textContent,
        xmin: parseInt(bndbox.getElementsByTagName('xmin')[0].textContent),
        ymin: parseInt(bndbox.getElementsByTagName('ymin')[0].textContent),
        xmax: parseInt(bndbox.getElementsByTagName('xmax')[0].textContent),
        ymax: parseInt(bndbox.getElementsByTagName('ymax')[0].textContent),
      });
    }
    setAnnotations(annotationsArray);
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

  // 更新绘制效果
  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = image.width;
      canvas.height = image.height;
      
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 应用缩放和平移
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);
      
      ctx.drawImage(image, 0, 0);
      
      annotations.forEach(box => {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2 / scale; // 调整线宽以适应缩放
        ctx.strokeRect(
          box.xmin,
          box.ymin,
          box.xmax - box.xmin,
          box.ymax - box.ymin
        );
        
        ctx.fillStyle = '#00ff00';
        ctx.font = `${16 / scale}px Arial`; // 调整字体大小以适应缩放
        ctx.fillText(box.name, box.xmin, box.ymin - 5);
      });
      
      ctx.restore();
    }
  }, [image, annotations, scale, offset]);

  return (
    <Layout
      title="VOC数据集查看器"
      description="VOC目标检测数据集可视化工具">
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl text-gray-900 dark:text-gray-100 mb-8 text-center">
          VOC数据集查看器
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg mb-8">
          <h3 className="mb-4 text-gray-900 dark:text-gray-100">📝 使用说明</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">1. 可以用来查看 VOC 数据集的标注效果</p>
          <ul className="ml-5 mb-2.5 text-gray-700 dark:text-gray-300">
            <li>图片文件应该位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">JPEGImages</code> 文件夹下</li>
            <li>标注文件应该位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Annotations</code> 文件夹下</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-2">2. 选择对应的图片文件（.jpg）和标注文件（.xml）进行可视化。</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">3. VOC 数据集下载：
            <a href="http://host.robots.ox.ac.uk/pascal/VOC/voc2007/VOCtrainval_06-Nov-2007.tar" 
               target="_blank"
               className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Pascal VOC 2007
            </a>
            与
            <a href="http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar" 
               target="_blank"
               className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Pascal VOC 2012
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            4. <a href="http://host.robots.ox.ac.uk/pascal/VOC/" 
               target="_blank"
               className="text-blue-600 dark:text-blue-400 hover:underline">
              VOC 竞赛以及数据集官网
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">5. 如果大家在为科研或就业做学习准备，想找大佬1V1带的话，可以戳 <a href="https://www.bilibili.com/opus/633620127076581396" className="text-blue-600 dark:text-blue-400 hover:underline"> 给大家推荐大佬1对1带着学</a>，我们合作很久了，很靠谱的大牛团队 </p>

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
              accept=".xml"
              onChange={handleAnnotationUpload}
              id="annotationUpload"
              className="hidden"
            />
            <label
              htmlFor="annotationUpload"
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer inline-block transition-colors"
            >
              📄 上传VOC标注文件
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
      </div>
    </Layout>
  );
};

export default VOCDatasetView;
