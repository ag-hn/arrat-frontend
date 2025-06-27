"use client";

import { ShowMore } from "@/components/ui/show-more";
import { List, ListItem } from "@/components/ui/list";
import { Badge } from "@/components/ui/badge";
import { Span } from "@/components/typeography/span";
import {
  ProgressCircle,
  type ProgressCircleProps,
} from "@/components/visualizations/data-elements";
import type { TODO } from "@/types/utility";

const circleTabs = [
  {
    title: "Left Lane - AV score",
    color: "cyan",
    value: 76,

    statistics: [
      {
        title: "Level High",
        value: "120 frames",
      },
      {
        title: "Level Medium",
        value: "64 frames",
      },
      {
        title: "Level Low",
        value: "24 frames",
      },
    ],
  },
  {
    title: "Right Lane - AV score",
    color: "blue",
    value: 93,

    statistics: [
      {
        title: "Level High",
        value: "320 frames",
      },
      {
        title: "Level Medium",
        value: "45 frames",
      },
      {
        title: "Level Low",
        value: "23 frames",
      },
    ],
  },
  {
    title: "External Influences - quality",
    color: "violet",
    value: 88,

    statistics: [
      {
        title: "Clear",
        value: "74 %",
      },
      {
        title: "Heavy debris",
        value: "12 %",
      },
      {
        title: "Tar lanes",
        value: "22 %",
      },
      {
        title: "Repair patches",
        value: "2 %",
      },
      {
        title: "Tire marks",
        value: "13 %",
      },
      {
        title: "Bridge shadow",
        value: "6.33 %",
      },
    ],
  },
] as const satisfies ({ statistics?: TODO[] } & ProgressCircleProps)[];

const circleTotal = Math.round(
  circleTabs.reduce<number>((total, current) => total + current.value, 0) /
  circleTabs.length /
  10,
);

/**
 * Shows statistical information for all units and segments on the route within a 
 * circle chart.
 * @returns React Component
 * @deprecated THIS IS ONLY A MOCK EXAMPLE, DATA IS NOT LIVE.
 */
export function MockCircleChart() {
  return (
    <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start">
      <div className="grid content-center items-center justify-center pt-0 md:pt-4">
        {!!circleTabs &&
          circleTabs.map((c, i) => {
            const radius = 30 + 5 * i;
            return (
              <ProgressCircle
                key={c.title}
                style={{ gridColumn: 1, gridRow: 1 }}
                color={c.color}
                value={c.value}
                radius={radius}
                strokeWidth={3}
              />
            );
          })}

        <div
          style={{ gridColumn: 1, gridRow: 1 }}
          className="flex items-center justify-center gap-1"
        >
          <Span tint={"strong"} affects={"small"}>
            {circleTotal}
          </Span>
          <Span tint={"subtle"} variant={"label"}>
            / 10
          </Span>
        </div>
      </div>

      <ShowMore backgroundClassName="from-subtle" header={"Overall Readiness Scores"}>
        <MockContent />
      </ShowMore>
    </div>
  );
}

function MockContent() {
  if (!circleTabs) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4">
      {circleTabs.map((s) => {
        return (
          <div
            key={s.title}
            className="flex flex-col gap-1 hover:cursor-pointer hover:opacity-50"
          >
            <List>
              <ListItem>
                <Span className="flex flex-row items-center justify-center gap-2">
                  <Badge variant={s.color} className="aspect-square" /> {s.title}
                </Span>
                <Span tint={"strong"}>{s.value}%</Span>
              </ListItem>
            </List>

            <List>
              {!!s.statistics &&
                s.statistics.map((s) => {
                  return (
                    <ListItem key={s.title}>
                      <Span
                        variant={"default"}
                        className="flex flex-row items-center justify-center gap-2"
                      >
                        {s.title}
                      </Span>
                      <Span tint={"strong"}>{s.value}</Span>
                    </ListItem>
                  );
                })}
            </List>
          </div>
        );
      })}
    </div>
  );
}
