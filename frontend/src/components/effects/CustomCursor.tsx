/**
 * CustomCursor - 统一光标组件
 * 
 * ## 类型
 * - dot: 实心圆点（默认）
 * - ring: 圆环
 * - image: 图片光标（使用预设名称）
 * - default: 系统默认光标，不渲染自定义光标
 * 
 * ## 效果（dot/ring 可选，可同时使用）
 * - glow: 光晕效果
 * - blendMode: 混合模式 (difference/overlay)
 * 
 * ## 默认配置
 * type="dot" color="#ffffff" blendMode="difference"（无光晕）
 * 
 * ## 用法
 * <CustomCursor />  // 默认：白色反色圆点
 * <CustomCursor type="dot" color="#d4a574" glow />
 * <CustomCursor type="ring" color="#ffffff" blendMode="difference" />
 * <CustomCursor type="image" name="shadow-pointer" />
 * <CustomCursor type="default" />  // 使用系统光标
 */

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

// ============================================================================
// 图片光标预设
// ============================================================================

const IMAGE_PRESETS: Record<string, { src: string; hotspot: [number, number] }> = {
  'shadow-pointer': {
    src: '/cursors/shadow-pointer.svg',
    hotspot: [0, 0],
  },
  // 添加更多预设：
  // 'pixel-pointer': { src: '/cursors/pixel-pointer.svg', hotspot: [0, 0] },
  // 'glass-hand': { src: '/cursors/glass-hand.svg', hotspot: [10, 2] },
}

// ============================================================================
// 类型定义
// ============================================================================

export type CursorType = 'dot' | 'ring' | 'image' | 'default'
export type BlendMode = 'difference' | 'overlay'

export interface CustomCursorProps {
  /** 光标类型 */
  type?: CursorType
  /** 颜色（dot/ring 专用） */
  color?: string
  /** 大小（dot/ring 专用），默认 16 */
  size?: number
  /** 光晕效果（dot/ring 专用） */
  glow?: boolean
  /** 混合模式（dot/ring 专用） */
  blendMode?: BlendMode
  /** 图片预设名称（image 专用） */
  name?: string
}

// ============================================================================
// 主组件
// ============================================================================

export function CustomCursor({
  type = 'dot',
  color = '#ffffff',
  size = 16,
  glow = false,
  blendMode = 'difference',
  name,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()

  // 鼠标移动跟踪 + 窗口离开检测
  useEffect(() => {
    if (type === 'default') return

    let hoverCheckTimeout: number

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // hover 检测异步执行，不阻塞位置更新
      cancelAnimationFrame(hoverCheckTimeout)
      hoverCheckTimeout = requestAnimationFrame(() => {
        const target = e.target as HTMLElement
        const isInteractive = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
        )
        setIsHovering(!!isInteractive)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(hoverCheckTimeout)
    }
  }, [type])

  // 滚动状态检测
  useEffect(() => {
    if (type === 'default' || !lenis) return

    let scrollTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150)
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lenis, type])

  // default 类型：不渲染任何东西
  if (type === 'default') return null

  // image 类型
  if (type === 'image') {
    const preset = name ? IMAGE_PRESETS[name] : null
    if (!preset) {
      console.warn(`CustomCursor: image preset "${name}" not found`)
      return null
    }

    const [hotspotX, hotspotY] = preset.hotspot

    return (
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
        style={{
          transform: `translate(${position.x - hotspotX}px, ${position.y - hotspotY}px)`,
          opacity: isVisible ? (isScrolling ? 0.3 : 1) : 0,
        }}
      >
        <img
          src={preset.src}
          alt=""
          className="block"
          style={{ width: 'auto', height: 'auto' }}
          draggable={false}
        />
      </div>
    )
  }

  // dot/ring 类型
  const isRing = type === 'ring'
  const baseSize = size
  const hoverScale = isRing ? 1.5 : 1.3
  const currentSize = isHovering ? baseSize * hoverScale : baseSize

  // ========== 光晕配置（可调整） ==========
  const glowSizeMultiplier = 4       // 光晕大小倍数（相对于 baseSize）
  const glowOpacity = '80'           // 光晕中心透明度（hex: 00-ff）
  const glowFadeEnd = 70             // 渐变消失位置（%）
  const glowBlur = 'blur-xl'         // 模糊程度：blur-sm/md/lg/xl/2xl
  // =======================================
  const glowSize = baseSize * glowSizeMultiplier

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? (isScrolling ? 0.3 : 1) : 0,
        mixBlendMode: blendMode || undefined,
      }}
    >
      {/* 主体：实心圆或圆环 */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          ...(isRing
            ? { border: `1.5px solid ${color}`, background: 'transparent' }
            : { background: color }),
          // 有混合模式时不改变透明度（放大已表示悬浮）
          opacity: blendMode ? 1 : (isHovering ? 0.7 : 1),
        }}
      />

      {/* 光晕效果（可选，独立于混合模式） */}
      {glow && (
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBlur}`}
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: `radial-gradient(circle, ${color}${glowOpacity} 0%, transparent ${glowFadeEnd}%)`,
            // 光晕不受混合模式影响
            mixBlendMode: 'normal',
          }}
        />
      )}
    </div>
  )
}

export default CustomCursor
