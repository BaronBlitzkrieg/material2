/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {join} from 'path';

/** Path to the test collection file for the Material schematics */
export const collectionPath = join(__dirname, '..', 'test-collection.json');

/** Path to the test migration file for the Material update schematics */
export const migrationCollection = join(__dirname, '..', 'test-migration.json');

/**
 * Create a base app used for testing.
 */
export function createTestApp(): UnitTestTree {
  const baseRunner = new SchematicTestRunner('material-schematics', collectionPath);

  const workspaceTree = baseRunner.runExternalSchematic('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '6.0.0',
    newProjectRoot: 'projects',
  });

  return baseRunner.runExternalSchematic('@schematics/angular', 'application', {
    name: 'material',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
  }, workspaceTree);
}
