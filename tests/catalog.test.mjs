import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { unzipSync, strFromU8 } from 'fflate';
import catalog from '../src/data/catalog.json' with { type: 'json' };
import { compilePrompt, createPackage, filterRoles } from '../src/lib.mjs';

const root = new URL('../', import.meta.url);

test('catalog contains 108 unique roles across nine balanced categories', () => {
  assert.equal(catalog.roles.length, 108);
  assert.equal(catalog.categories.length, 9);
  assert.equal(new Set(catalog.roles.map((role) => role.id)).size, 108);
  for (const category of catalog.categories) {
    assert.equal(catalog.roles.filter((role) => role.category === category.id).length, 12);
  }
});

test('every catalog role has a substantial prompt file', () => {
  for (const role of catalog.roles) {
    const path = new URL(`public/prompts/${role.id}.md`, root);
    assert.ok(existsSync(path), `missing prompt for ${role.id}`);
    const prompt = readFileSync(path, 'utf8');
    assert.ok(prompt.startsWith('#'));
    assert.ok(prompt.length > 1000, `${role.id} prompt is unexpectedly short`);
  }
});

test('search covers role metadata and task examples', () => {
  const byName = filterRoles(catalog.roles, '产品经理', 'all', [], false);
  const byTask = filterRoles(catalog.roles, 'PRD', 'all', [], false);
  assert.ok(byName.some((role) => role.id === 'product-manager'));
  assert.ok(byTask.some((role) => role.id === 'product-manager'));
});

test('Codex export contains skill, task, license and instructions', () => {
  const role = catalog.roles[0];
  const prompt = readFileSync(new URL(`public/prompts/${role.id}.md`, root), 'utf8');
  const archive = unzipSync(createPackage([{ role, prompt, brief: { task: '测试任务' } }], 'MIT test license'));
  const skillPath = `.agents/skills/market-${role.id}/SKILL.md`;
  assert.ok(archive[skillPath]);
  assert.match(strFromU8(archive[skillPath]), new RegExp(`name: market-${role.id}`));
  assert.match(strFromU8(archive[`tasks/${role.id}.md`]), /测试任务/);
  assert.match(strFromU8(archive[`.agents/skills/market-${role.id}/LICENSE-source.txt`]), /MIT test license/);
  assert.match(strFromU8(archive['README-先读我.md']), /不会自动调用模型/);
});

test('compiled task uses explicit brief and safe fallbacks', () => {
  const role = catalog.roles[0];
  const value = compilePrompt(role, '# 角色', { task: ' 做测试 ', context: '', format: '' });
  assert.match(value, /# 当前用户任务\n做测试/);
  assert.match(value, /尚未提供/);
  assert.match(value, /关键假设及验证方法/);
});
