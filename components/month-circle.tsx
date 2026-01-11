import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';

interface MonthCircleProps {
  daysInMonth?: number;
  moods?: (string | undefined)[];
}

const MonthCircle: React.FC<MonthCircleProps> = ({ daysInMonth = 31, moods = [] }) => {
    const theme = useTheme();
    const windowWidth = Dimensions.get('window').width;
    const size = windowWidth * 0.9;
    const strokeWidth = 70;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
        const start = polarToCartesian(x, y, radius, startAngle);
        const end = polarToCartesian(x, y, radius, endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(' ');
        return d;
    };
  
    const sections = [];
    const labels = [];
    const angleStep = 360 / daysInMonth;
    const gap = 0.75;

    for (let i = 0; i < daysInMonth; i++) {
        const startAngle = i * angleStep + gap/2;
        const endAngle = (i + 1) * angleStep - gap/2;
        const pathData = describeArc(center, center, radius, startAngle, endAngle);

        sections.push(
            <Path
                key={`section-${i}`}
                d={pathData}
                stroke={moods[i] || theme.secondary}
                strokeWidth={strokeWidth}
            />
        );

        const labelAngle = i * angleStep + angleStep / 2;
        const labelPos = polarToCartesian(center, center, radius, labelAngle);
        labels.push(
            <SvgText
                key={`label-${i}`}
                x={labelPos.x}
                y={labelPos.y}
                fill={theme.onSecondary}
                opacity={0.9}
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="central"
            >
                {i + 1}
            </SvgText>
        );
    }

    return (
        <View style={styles.container}>
            <Svg height={size} width={size}>
                <G>
                    {sections}
                </G>
                <G>
                    {labels}
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MonthCircle;
