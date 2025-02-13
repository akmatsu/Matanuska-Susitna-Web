// admin/pages/custom-page.tsx
import { useEffect, useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { TYPESENSE_CLIENT } from '../../src/utils/typesense';
import { Button } from '@keystone-ui/button';

export default function CustomPage() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    getHealth();
  }, []);

  async function getHealth() {
    try {
      setLoading(true);
      const res = await TYPESENSE_CLIENT.health.retrieve();
      if (res) {
        setHealth(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createCollections() {
    try {
      setCreateLoading(true);
      const res = fetch('/typesense/create-collections', {
        method: 'POST',
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCreateLoading(false);
    }
  }

  async function removePagesCollection() {
    try {
      setCreateLoading(true);
      const res = fetch('/typesense/remove-collection', {
        method: 'POST',
        body: JSON.stringify({ collection: 'pages' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCreateLoading(false);
    }
  }

  async function importServices() {
    try {
      setCreateLoading(true);
      const res = fetch('/typesense/import-services', {
        method: 'POST',
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCreateLoading(false);
    }
  }

  async function importCommunities() {
    try {
      setCreateLoading(true);
      const res = fetch('/typesense/import-communities', {
        method: 'POST',
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCreateLoading(false);
    }
  }

  return (
    <PageContainer header="Typesense Management">
      <h1>This is a custom Admin UI Page</h1>
      {loading ? (
        <p>Checking Typesense health...</p>
      ) : health ? (
        <p>Typesense is healthy</p>
      ) : (
        <p>Typesense is not healthy</p>
      )}

      <Button onClick={createCollections} isLoading={createLoading}>
        Create Collections
      </Button>

      <Button onClick={removePagesCollection} isLoading={createLoading}>
        Remove Pages Collection
      </Button>
      <Button onClick={importServices} isLoading={createLoading}>
        Import Services
      </Button>
      <Button onClick={importCommunities} isLoading={createLoading}>
        Import Communities
      </Button>
    </PageContainer>
  );
}
