export type WorkTypeFilter = 'all' | 'case-study' | 'project';

interface ProjectFilterProps {
  activeType: WorkTypeFilter;
  onTypeChange: (type: WorkTypeFilter) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  caseStudiesCount?: number;
  projectsCount?: number;
  totalCount?: number;
}

export function ProjectFilter({
  activeType,
  onTypeChange,
  categories,
  activeCategory,
  onCategoryChange,
  caseStudiesCount = 0,
  projectsCount = 0,
  totalCount = 0,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Primary Type Toggle: All Works / Case Studies / Projects */}
      <div className="flex items-center gap-2 p-1.5 bg-surface/80 border border-border rounded-xl w-fit backdrop-blur-sm">
        <button
          onClick={() => onTypeChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all flex items-center gap-2 ${
            activeType === 'all'
              ? 'bg-accent text-base font-medium shadow-sm'
              : 'text-text-muted hover:text-text'
          }`}
        >
          All Works
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeType === 'all' ? 'bg-base/30 text-base' : 'bg-elevated text-text-muted'
          }`}>
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => onTypeChange('case-study')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all flex items-center gap-2 ${
            activeType === 'case-study'
              ? 'bg-secondary text-base font-medium shadow-sm'
              : 'text-text-muted hover:text-secondary'
          }`}
        >
          Case Studies
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeType === 'case-study' ? 'bg-base/30 text-base' : 'bg-elevated text-text-muted'
          }`}>
            {caseStudiesCount}
          </span>
        </button>

        <button
          onClick={() => onTypeChange('project')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all flex items-center gap-2 ${
            activeType === 'project'
              ? 'bg-accent text-base font-medium shadow-sm'
              : 'text-text-muted hover:text-text'
          }`}
        >
          Projects
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeType === 'project' ? 'bg-base/30 text-base' : 'bg-elevated text-text-muted'
          }`}>
            {projectsCount}
          </span>
        </button>
      </div>

      {/* Secondary Category Filter */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-text-muted whitespace-nowrap mr-2">// Filter by tag:</span>
          <button
            onClick={() => onCategoryChange('')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              activeCategory === ''
                ? 'bg-elevated border border-accent/40 text-accent font-medium'
                : 'bg-surface/50 border border-border text-text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            All Tags
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-elevated border border-accent/40 text-accent font-medium'
                  : 'bg-surface/50 border border-border text-text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
