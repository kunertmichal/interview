import { Settings } from 'lucide-react';

export const EditOrganization = () => {
  return (
    <div className="drawer drawer-end">
      <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="settings-drawer"
          className="drawer-button btn btn-secondary btn-square"
        >
          <Settings />
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="settings-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
          <h3 className="text-white font-semibold text-lg">
            Edit organization
          </h3>
          <div>rename organization</div>
          <h3 className="text-white font-semibold text-lg">
            Remove organization
          </h3>
          <div>usunięcie organization</div>
        </div>
      </div>
    </div>
  );
};
