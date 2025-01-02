import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InPageNavigation } from './InPageNavigation';

const meta: Meta<typeof InPageNavigation> = {
  title: 'Components/InPageNavigation',
  component: InPageNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InPageNavigation>;

export const Default: Story = {
  args: {},
  render() {
    return (
      <div className="grid grid-cols-12 max-w-screen-xl mx-auto">
        <div className="relative col-span-4">
          <InPageNavigation />
        </div>
        <div className="col-span-8">
          <div className="prose">
            <h1>Getting Started with Our Platform</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <h2>Key Features</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>

            <h3>Advanced Analytics</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Description</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Real-time tracking</td>
                  <td>Monitor metrics instantly</td>
                  <td>All plans</td>
                </tr>
                <tr>
                  <td>Custom reports</td>
                  <td>Generate detailed insights</td>
                  <td>Premium</td>
                </tr>
              </tbody>
            </table>

            <h2>Implementation Guide</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore.
            </p>

            <h3>Setup Process</h3>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi.
            </p>

            <h3>Configuration Options</h3>
            <p>
              Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus id quod maxime placeat facere possimus,
              omnis voluptas assumenda est.
            </p>

            <h2>Best Practices</h2>
            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Practice</th>
                  <th>Impact</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Regular updates</td>
                  <td>High</td>
                  <td>Low</td>
                </tr>
                <tr>
                  <td>Data backup</td>
                  <td>Critical</td>
                  <td>Medium</td>
                </tr>
              </tbody>
            </table>

            <h2>Advanced Topics</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <h3>
              Performance Optimization this is a long title to see what happens
              yeehaw
            </h3>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur? At vero eos et accusamus et
              iusto odio dignissimos.
            </p>

            <h3>Security Considerations</h3>
            <p>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Security Level</th>
                  <th>Protection</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic</td>
                  <td>Standard encryption</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>Advanced</td>
                  <td>Multi-factor authentication</td>
                  <td>Premium</td>
                </tr>
              </tbody>
            </table>

            <h2>Troubleshooting</h2>
            <p>
              Itaque earum rerum hic tenetur a sapiente delectus, ut aut
              reiciendis voluptatibus maiores alias consequatur aut perferendis
              doloribus asperiores repellat.
            </p>

            <h3>Common Issues</h3>
            <p>
              Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae
              consequatur.
            </p>

            <h3>Support Resources</h3>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit.
            </p>
          </div>
        </div>
      </div>
    );
  },
};
