# Custom Tooltip

CTooltip is an object constructor for a customizable tooltip. The tooltip consists of three parts. A heading (top) a list with metainfos (left) and a svg (right) all three can be fully cusomized by setting functions to get them or build them from the selected (hovered) htmlElement.

Usage:

1. Initialize an object: "var tooltip = new CTooltip"
2. Add the tooltip to htmlElements by "tooltip.addTo(htmlElement)". The tooltip will be shown "onMouseEnter(event)". Default is "event.target.id".
3. Set a function to get a heading with "tooltip.setHeading(function)". The function will get "event" as argument from the "onMouseEnter(event)" event.
4. Set a function to get metainfos with "tooltip.setMetainfos(function)". The function will get "event" as argument from the "onMouseEnter(event)" event.
5. Set a function to get a SVG with "tooltip.setSvg(function)". The function will get "event" as argument from the "onMouseEnter(event)" event.

Additions:
- the tooltip can be removed from htmlElements by "tooltip.removeFrom(htmlElement)"
- setHeading function has to return a **string object**
- setMetainfos function has to return a **js-object: { firstInfo : "first", secondInfo : "second" ...}**
- setSvg function has to return an **svg element (node)**
- style of the container element ("div") can be customized by "tooltip.setStyle(styles)" (styeles is a js object)

CSS-classes:
- **div** container: "ctooltip"
- **div** heading: "ctooltip_heading"
- **ul** metainfos: "ctooltip_meta"
- **div** svgContainer: "ctooltip_svg"