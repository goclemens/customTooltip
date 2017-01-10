function CTooltip(id) {

  //#### CONSTRUCTOR START ####
  //#### definition & initializing of tooltip object ####

  //------- initialization of container -------
  var container = document.createElement("div");

  // optional contructor argument
  if (id !== undefined) {
    container.id = id;
  }

  container.className = "ctooltip";
  container.style.display = "none";
  container.style["pointer-events"] = "none";
  container.style.position = "absolute";

  //------- default styles for container -------
  container.style.background = "rgba(136, 229, 252, 0.9)";
  container.style.border = "2px solid #00cbff";
  container.style["border-radius"] = "20px";
  container.style.padding = "10px";
  //container.style.height = "200px";
  container.style["min-width"] = "350px";
  container.style["font-family"] = "Tahoma, Geneva, sans-serif";


  //------- tooltip parts -------

  // heading
  var heading = document.createElement("div");
  heading.className = "ctooltip_heading";
  heading.innerHTML = "";
  container.appendChild(heading);

  heading.style["font-weight"] = "bold";
  heading.style["font-size"] = 28;
  heading.style["padding-bottom"] = "5px";
  heading.style.background = "linear-gradient(to bottom, rgb(0, 199, 255), rgb(136, 229, 252))"

  // metainfos
  var ul = document.createElement("ul")
  ul.className = "ctooltip_meta";
  container.appendChild(ul);

  ul.style.float = "left";
  ul.style["list-style"] = "none";
  ul.style["padding-left"] = 0;

  // preview SVG
  var svgCont = document.createElement("div");
  svgCont.className = "ctooltip_svg";
  container.appendChild(svgCont);

  svgCont.style.float = "right";

  //------- adding 
  document.body.appendChild(container);

  //#### CONSTRUCTOR END ####


  //#### methods ####
  // add tootip to specific htmlElements
  this.addTo = function(htmlElement) {
    htmlElement.addEventListener("mouseenter", onMouseEnter);
    htmlElement.addEventListener("mouseleave", onMouseLeave);
    htmlElement.addEventListener("mousemove", onMouseMove);
  }
  this.removeFrom = function(htmlElement) {
    htmlElement.removeEventListener("mouseenter", onMouseEnter);
    htmlElement.removeEventListener("mouseleave", onMouseLeave);
    htmlElement.removeEventListener("mousemove", onMouseMove);
  }
  this.setHeading = function(func) {
    getHeading = func;
  }
  this.setSvg = function(func) {
    getSvg = func;
  }
  this.setMetainfos = function (func) {
    getMetainfos = func;
  }
  this.setStyle = function(styles) {
    for (styleName in styles) {
      container.style[styleName] = styles[styleName];
    }
  }

  //#### private functions ####
  // default settings for the tooltip parts if not set by "this.setPART"
  function getHeading(event) {

    return event.target.id;

  }

  function getSvg(event) {

    console.log("CTooltip - getSvg: no function set to get an SVG, plz use .setSvg(function). Returning empty SVG.");
    var emptySvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    emptySvg.style.width = "190px";
    emptySvg.style.height = "120px";
    return emptySvg;

  }

  function getMetainfos(event) {

    console.log("CTooltip - getMetainfos: no function set to get metainfos, plz use .setMetainfos(function).");

    var metainfos = {
                    firstInfo   : "this",
                    secondInfo  : "is",
                    thirdInfo   : "default"
                    };
    return metainfos;

  }

  // event handling
  function onMouseEnter(event) {

    // set heading
    heading.innerHTML = getHeading(event);

    // set metainfos
    ul.innerHTML = "";
    var metainfos = getMetainfos(event);
    for (metainfo in metainfos) {
      var li = document.createElement("li");

      var spanLabel = document.createElement("span");
      spanLabel.innerHTML = metainfo;
      spanLabel.style.float = "left";
      spanLabel.style.width = "85px";

      var spanInfo = document.createElement("span");
      spanInfo.innerHTML = ": "+metainfos[metainfo];

      li.appendChild(spanLabel);
      li.appendChild(spanInfo);

      ul.appendChild(li);
    }

    // set svg
    var detachedSvg = getSvg(event);
    var emptySvg = svgCont.cloneNode(false);
    svgCont.parentNode.replaceChild(emptySvg, svgCont);
    svgCont = emptySvg;
    svgCont.appendChild(detachedSvg);
    
    // set position
    var position = {  x: event.clientX,
                      y: event.clientY };
    show(position);

  }

  function onMouseLeave(event) {

    hide();

  }

  function onMouseMove(event) {

    var position = {  x: event.clientX,
                      y: event.clientY };
    show(position);

  }

  // show the tooltip
  function show(pos) {

    container.style.display = "initial";
    container.style.left = pos.x+20+document.scrollingElement.scrollLeft+"px";
    container.style.top = pos.y+document.scrollingElement.scrollTop+"px";
    
  }

  // hide tooltip
  function hide() {

    container.style.display = "none";

  }

}

