import {
  simpleSquareIcon,
  linksTypeIconMap,
  iconsMap,
  itemGroupIconMap
} from "./happi-graph.render";

import { pluralize } from '@capaj/pluralize';

export const getIcon = (type: any, label: any, legendData: any) => {
  const iconName = legendData[type][label];

  if ((itemGroupIconMap[iconName] && iconsMap[itemGroupIconMap[iconName].icon])) {
    return iconsMap[itemGroupIconMap[iconName].icon];
  } else if (linksTypeIconMap[iconName] && iconsMap[linksTypeIconMap[iconName].icon]) {
    return iconsMap[linksTypeIconMap[iconName].icon];
  } else {
    return simpleSquareIcon;
  }
};

export const getLabel = (group: any) => {
  return pluralize(group);
};

export const getLegendCategories = (legendData: any) => {
  return Object.keys(legendData);//.map((k: any) => { return pluralize(k); });
};

export const getLegendLabels = (legendData: any, legendKey: any) => {
  return [
    // @ts-ignore
    ...new Set( Object.keys(legendData[legendKey]) )
  ];
};

export const graphLinksUpdateInLegendData = (newGraphLinks: object[]) => {
  const _links = newGraphLinks;

  const legendData: any = {};

  if (_links.length) {
    _links.forEach((l: any) => {
      if (l.type && linksTypeIconMap[l.type]) {
        const group = linksTypeIconMap[l.type].group;

        if (!legendData[group]) {
          legendData[group] = [];
        }

        legendData[group][linksTypeIconMap[l.type].label] = l.type;
      }
    });
  }

  return legendData;
}

export const graphNodesUpdateInLegendData = (newGraphNodes: any) => {
  const _nodes = newGraphNodes;
  const legendData: any = {};

  if (_nodes.length) {
    _nodes.forEach((n: any) => {
      const group = itemGroupIconMap[n.label].group;

      if (!legendData[group]) {
        legendData[group] = [];
      }

      legendData[group][n.label] = n.label;

      n.properties.forEach((p: any) => {
        if (itemGroupIconMap[p.groupName]){
          const propertiesGroup = itemGroupIconMap[p.groupName].group;

          legendData[propertiesGroup][p.groupName] = p.groupName;
        }
      });
    });
  }

  return legendData;
}
