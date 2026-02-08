import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';

const YOLODatasetView = () => {
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
          parseYOLOAnnotation(event.target.result, image.width, image.height);
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

  // YOLO格式解析函数
  const parseYOLOAnnotation = (content, imageWidth, imageHeight) => {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const annotationsArray = lines.map(line => {
      const [classIndex, x_center, y_center, width, height] = line.trim().split(/\s+/).map(Number);
      
      // 转换YOLO格式到像素坐标
      const xmin = (x_center - width/2) * imageWidth;
      const ymin = (y_center - height/2) * imageHeight;
      const xmax = (x_center + width/2) * imageWidth;
      const ymax = (y_center + height/2) * imageHeight;

      return {
        name: `class ${classIndex}`,
        xmin, ymin, xmax, ymax
      };
    });
    setAnnotations(annotationsArray);
  };

  // 添加重置函数
  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // 修改缩放处理函数
  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
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

  // 添加画布渲染效果
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
      
      // 绘制标注框
      annotations.forEach(box => {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2 / scale; // 调整线宽以适应缩放
        ctx.strokeRect(
          box.xmin,
          box.ymin,
          box.xmax - box.xmin,
          box.ymax - box.ymin
        );
        
        // 绘制类别标签
        ctx.fillStyle = '#00ff00';
        ctx.font = `${16 / scale}px Arial`; // 调整字体大小以适应缩放
        ctx.fillText(box.name, box.xmin, box.ymin - 5);
      });
      
      ctx.restore();
    }
  }, [image, annotations, scale, offset]);

  return (
    <Layout
      title="YOLO数据集查看器"
      description="YOLO目标检测数据集可视化工具">
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl text-gray-900 dark:text-gray-100 mb-8 text-center">
          YOLO数据集查看器
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg mb-8">
          <h3 className="mb-4 text-gray-900 dark:text-gray-100">📝 使用说明</h3>
          <p className="text-gray-700 dark:text-gray-300">1. 数据集结构应符合 YOLO 格式规范：</p>
          <ul className="ml-5 mb-2.5 text-gray-700 dark:text-gray-300">
            <li>图片文件位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">images/</code> 目录</li>
            <li>标注文件位于 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">labels/</code> 目录</li>
            <li>类别名称文件 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">classes.txt</code>，每行一个类别名称</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">2. 选择对应的图片文件（.jpg/.png）和标注文件（.txt）以及类别文件进行可视化。</p>
          <p className="text-gray-700 dark:text-gray-300">3. YOLO 数据集示例下载：
            <a href="https://github.com/ultralytics/yolov5/releases/download/v1.0/coco128.zip" 
               target="_blank"
               className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              COCO128
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">4. 如果大家在为科研或就业做学习准备，想找大佬1V1带的话，可以戳 <a href="https://www.bilibili.com/opus/633620127076581396" className="text-blue-600 dark:text-blue-400 hover:underline"> 给大家推荐大佬1对1带着学</a>，我们合作很久了，很靠谱的大牛团队 </p>
        </div>

        {/* 文件上传区域 */}
        <div className="text-center mb-4">
          {imageFileName && <p className="text-gray-700 dark:text-gray-300">图片文件: {imageFileName}</p>}
          {annotationFileName && <p className="text-gray-700 dark:text-gray-300">标注文件: {annotationFileName}</p>}
        </div>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          {/* 图片上传按钮 */}
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

          {/* 标注文件上传按钮 */}
          <div className="relative">
            <input
              type="file"
              accept=".txt"
              onChange={handleAnnotationUpload}
              id="annotationUpload"
              className="hidden"
            />
            <label
              htmlFor="annotationUpload"
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer inline-block transition-colors"
            >
              📄 上传YOLO标注文件
            </label>
          </div>

          {/* 开始标注按钮 */}
          <button
            onClick={handleStartAnnotation}
            disabled={isAnnotating}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white rounded transition-colors min-w-[120px] h-[41px] disabled:opacity-70"
          >
            {isAnnotating ? '处理中...' : '开始标注'}
          </button>

          {/* 重置视图按钮 */}
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer transition-colors min-w-[120px] h-[41px]"
          >
            重置视图
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`text-center mb-4 p-2.5 rounded ${
            message.includes('成功') 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        {/* 添加缩放控制区域 */}
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

        {/* 修改画布区域，移除滚轮事件 */}
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

export default YOLODatasetView;
