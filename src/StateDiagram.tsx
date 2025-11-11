import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

const CHART = `stateDiagram-v2
    state "TextAnalysis" as TextAnalysis {
        [*] --> LoadingModels
        LoadingModels --> PreparingTopics: onDone / loadModels
        PreparingTopics --> Ready: onDone / prepareTopics

        Ready --> Ready: SET_TEXT / assign(...)
        Ready --> Analyzing: ANALYZE [guard]

        state Analyzing {
            [*] --> Summarizing
            Summarizing --> Embedding: onDone / summarizeText
            Embedding --> Scoring: onDone / embedSummary
            Scoring --> Done: onDone / scoreTopics
        }

        Done --> Ready: RESET
    }`;

type StateChartProps = {
  currentState?: string | object;
};

function StateChart({ currentState }: StateChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const [svg, setSvg] = useState('');

  // Extract state names from the state value (handles nested states)
  const getStateNames = (state: string | object | undefined): string[] => {
    if (!state) return [];
    if (typeof state === 'string') return [state];
    if (typeof state === 'object') {
      const states: string[] = [];
      // For nested states like { Analyzing: 'Summarizing' }
      Object.entries(state).forEach(([parent, child]) => {
        states.push(parent);
        if (typeof child === 'string') {
          states.push(child);
        }
      });
      return states;
    }
    return [];
  };

  useEffect(() => {
    let isMounted = true;

    // Initialize Mermaid once per mount
    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    const render = async () => {
      try {
        // Generate a unique ID for this render
        const renderId = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(renderId, CHART);

        if (isMounted) setSvg(svg);
      } catch (err) {
        if (isMounted)
          setSvg(
            `<pre class="text-red-600 whitespace-pre-wrap">${String(err)}</pre>`
          );
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, []);

  // Highlight the current state when svg or currentState changes
  useEffect(() => {
    if (!svgContainerRef.current || !svg) return;

    const stateNames = getStateNames(currentState);

    // Wait for the DOM to update
    setTimeout(() => {
      if (!svgContainerRef.current) return;

      // Find all elements with id attributes (Mermaid uses IDs for states)
      const allGroups = svgContainerRef.current.querySelectorAll('g[id]');

      allGroups.forEach(group => {
        const id = group.getAttribute('id') || '';

        // Find rect or path within this group
        const shapeElement = group.querySelector('rect, path');

        if (shapeElement) {
          // Check if the ID contains any of the state names
          const normalizedId = id.toLowerCase().replace(/[^a-z]/g, '');
          const isActive = stateNames.some(stateName => {
            const normalizedStateName = stateName
              .toLowerCase()
              .replace(/[^a-z]/g, '');
            return normalizedId.includes(normalizedStateName);
          });

          if (isActive) {
            shapeElement.setAttribute('fill', '#C084FC');
            shapeElement.setAttribute('stroke', '#7C3AED');
            shapeElement.setAttribute('stroke-width', '6');
            (shapeElement as SVGGraphicsElement).style.filter =
              'drop-shadow(0 0 5px rgba(124, 58, 237, 0.8))';

            // Also add a class for additional styling
            group.classList.add('active-state');
          } else {
            // Reset to default
            shapeElement.setAttribute('fill', '#ECECFF');
            shapeElement.setAttribute('stroke', '#9370DB');
            shapeElement.setAttribute('stroke-width', '1');
            (shapeElement as SVGGraphicsElement).style.filter = 'none';
            group.classList.remove('active-state');
          }
        }
      });
    }, 100);
  }, [svg, currentState]);

  return (
    <div
      className="w-full max-w-full h-[800px] flex flex-col"
      ref={containerRef}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <h3 className="text-xl font-bold text-gray-800">State Machine Flow</h3>
      </div>

      {/* Mermaid renders to raw SVG markup */}
      <div
        ref={svgContainerRef}
        dangerouslySetInnerHTML={{ __html: svg }}
        className="flex-1 overflow-hidden flex items-center justify-center [&>svg]:max-h-full [&>svg]:w-auto"
      />
    </div>
  );
}

export default StateChart;
